import React from 'react';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
import {PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {FormControl} from 'react-bootstrap';
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    firebase.initializeApp({
      databaseURL: "https://remi-b28c1.firebaseio.com"
    });
    var db = firebase.database();
    var ref = db.ref("/u0");
    ref.on("value", function(snapshot) {
      this.setState({user: snapshot.val()});
      console.log(snapshot.val());
    }.bind(this));
  }
  
//<div className={styles['circle-percentage']}>82%</div><img className={styles['replace-me-circle']} height="150" sizes="(max-width: 479px) 65vw, 150px" src="assets/Circle.png" srcSet="assets/Circle.png 500w, assets/Circle.png 800w, assets/Circle.png 1080w, assets/Circle.png 1421w"/>

  render() {
    return (
      <div className="wholepage">
        <div className="maingpagecontainer w-container"><img className="bigremitext" data-ix="bounce" height="600" sizes="(max-width: 479px) 100vw, 309.625px" src="assets/Big%20Remi.png" srcset="assets/Big%20Remi.png 500w, assets/Big%20Remi.png 643w" />
          <div className="phonepagediv">
            <div className="meettext">talk soon!</div>
          </div>
        </div>
      </div>
    );
  }
}
