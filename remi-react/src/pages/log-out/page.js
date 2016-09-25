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
      <div className="whole-screen">
        <div className="log-out-container w-container">
          <div className="w-row">
            <div className="log-out-div w-col w-col-6">
              <div>
                <h1 className="log-out-heading">See you next time!</h1>
                <p className="log-out-body">And don't forget to take your meds!</p>
              </div><img className="city" sizes="(max-width: 479px) 100vw, (max-width: 767px) 400px, (max-width: 991px) 374px, 400px" src="assets/Log%20Out%20City.png" srcSet="assets/Log%20Out%20City.png 500w, assets/Log%20Out%20City.png 800w, assets/Log%20Out%20City.png 1080w, assets/Log%20Out%20City.png 1600w, assets/Log%20Out%20City.png 1872w" width="400"/>
            </div>
            <div className="w-col w-col-6"><img className="big-remi" data-ix="bounce-on-load" height="500" sizes="(max-width: 479px) 100vw, 258.015625px" src="assets/Big Remi.png" srcSet="assets/Big%20Remi.png 500w, assets/Big%20Remi.png 643w"/>
            </div>
          </div>
        </div>
        <div className="log-in-button w-container"><a className="log-in w-button" href="/">Log In</a>
        </div>
      </div>
    );
  }
}
