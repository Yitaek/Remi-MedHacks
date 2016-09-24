import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import firebase from 'firebase';
import {PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
export default class AdherencePieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    var db = firebase.database();
    var ref = db.ref("/u0");
    ref.on("value", function(snapshot) {
      this.setState({user: snapshot.val()});
      console.log(snapshot.val());
    }.bind(this));
  }
  


  render() {
    if (this.state.user.prescriptions) {
      var data = []
      this.state.user.prescriptions.forEach(function(current, index, array) {
        data = data.concat(current.adherence);
      }.bind(this));
      var groups = [{name: 'Doses Taken', value: 0}, {name: 'Doses Missed', value: 0}, {name: 'No Dose Info', value: 0}]
      data.forEach(function(current) {
        if (current.taken == 'yes' && Date.parse(current.date) <= Date.now()) {
          groups[0].value++;
        } else if (current.taken == 'no'  && Date.parse(current.date) <= Date.now()) {
          groups[1].value++;
        } else if (current.taken == ''  && Date.parse(current.date) <= Date.now()) {
          groups[2].value++;
        }
      })
      var COLORS = ['#40f2a5', '#ff6161', '#d1d1d1'];
      return (
        <div>
          <div className={styles.piechartAdherence}>
            <PieChart width={380} height={170}>
              <Pie data={groups} innerRadius={'70%'} outerRadius={'95%'}>
                {groups.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
              </Pie>
            </PieChart>
          </div>
          <div className={styles.adherencePercent}>
            {Math.round((groups[0].value / (groups[0].value + groups[1].value + groups[2].value))*100)}%
          </div>
        </div>

      );
    } else {
      return (
        <div className={styles.content}>
          <div className={styles.piechartAdherence}>
          </div>
          <div className={styles.adherencePercent}>
          </div>
        </div>
      );
    }
  }
}
