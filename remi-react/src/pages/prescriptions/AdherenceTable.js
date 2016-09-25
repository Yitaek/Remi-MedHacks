import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
import firebase from 'firebase';
import {PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Griddle from 'griddle-react';
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
      console.log(this.state.user);
      var dayAdherencePieChart = class dayAdherencePieChart extends React.Component {
          constructor(props) {
              super(props);
          }
          render() {
            var COLORS = ['#40f2a5', '#ff6161', '#d1d1d1'];
            if (this.props.data[0].value) {
              return (
                <PieChart width={30} height={30}>
                  <Pie data={this.props.data} innerRadius={'0%'} outerRadius={'95%'}>
                    {this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                </PieChart>
              );
            } else {
              return (
                <PieChart width={30} height={30}>
                  <Pie data={[{name: 'Doses Taken', value: 0}, {name: 'Doses Missed', value: 0}, {name: 'No Dose Info', value: 1}]} innerRadius={'0%'} outerRadius={'95%'}>
                    {this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                </PieChart>
              );
            }
          }
      }
      //the column meta data for the master ingress log
      var data = [];
      this.state.user.prescriptions.forEach(function(prescription, index, array) {
        data.push({name: prescription.name});
        prescription.adherence.forEach(function(dose, index2, array2) {
          if (!data[index][dose.date] && Date.parse(dose.date) < Date.now() && Date.parse(dose.date) > Date.now() - (1000 * 60 * 60 * 24 * 10)) {
            data[index][dose.date] = [{name: 'Doses Taken', value: 0}, {name: 'Doses Missed', value: 0}, {name: 'No Dose Info', value: 0}]
          }
          if (dose.taken == 'yes' && Date.parse(dose.date) < Date.now() && Date.parse(dose.date) > Date.now() - (1000 * 60 * 60 * 24 * 10)) {
            data[index][dose.date][0].value++;
          } else if (dose.taken == 'no'  && Date.parse(dose.date) < Date.now() && Date.parse(dose.date) > Date.now() - (1000 * 60 * 60 * 24 * 10)) {
            data[index][dose.date][1].value++;
          } else if (dose.taken == ''  && Date.parse(dose.date) < Date.now() && Date.parse(dose.date) > Date.now() - (1000 * 60 * 60 * 24 * 10) ) {
            data[index][dose.date][2].value++;
          }
        }.bind(this));
      }.bind(this));
      data.forEach(function(prescription, index, array) {
        if (Object.keys(prescription).length < 2) {
          data.splice(index, 1);
        }
      });
      console.log(data);
      console.log(Object.keys(data).length);
      if (Object.keys(data).length > 0) {
        var longest = -1;
        var indexOfLongest = -1;
        Object.keys(data).forEach(function(key, index, array) {
          if (Object.keys(data[key]).length > longest) {
            longest = Object.keys(data[key]).length;
            indexOfLongest = key;
          }
        }.bind(this));
        Object.keys(data[indexOfLongest]).forEach(function(key) {
          Object.keys(data).forEach(function(key2) {
            if (!data[key2][key]) {
              data[key2][key] = [{name: 'Doses Taken', value: 0}, {name: 'Doses Missed', value: 0}, {name: 'No Dose Info', value: 1}];
            }
          })
        }.bind(this));
        var columnMetadata = Object.keys(data[indexOfLongest]).map(function(key, index, array) {
          return {
            "columnName": key,
            "cssClassName": styles.ingressPlatform,
            "order":  index + 1,
            "locked": true,
            "visible": true,
            "displayName": key.split('/').slice(0, 2).join('/'),
            "customComponent": dayAdherencePieChart,
            "sortable": false
          }
        }.bind(this));
        columnMetadata[0] = {
            "columnName": 'name',
            "cssClassName": styles.ingressPlatform,
            "order":  1,
            "locked": true,
            "visible": true,
            "displayName": 'Prescription',
            "sortable": false
        }
        console.log(columnMetadata);
        return (
          <div>
            <Griddle
              results={data}
              useGriddleStyles={false} 
              showFilter={false} 
              enableInfiniteScroll={true}
              bodyHeight={400}
              columnMetadata={columnMetadata}
              
          />
          </div>
        );
      }

    }
    return (
      <div>
      </div>
    );
  }
}
