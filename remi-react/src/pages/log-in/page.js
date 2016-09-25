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
  throwAway(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    return (
      <div className="whole-screen">
        <div className="log-in-page log-out-container w-container">
          <div className="w-row">
            <div className="log-out-div w-clearfix w-col w-col-6">
              <div>
                <h1 className="log-out-heading">Welcome to MyRemi!</h1>
              </div>
              <div className="w-form">
                <form data-name="Email Form" action={this.throwAway} id="email-form" name="email-form">
                  <label className="field-head" htmlFor="name">Phone Number:</label>
                  <input className="box-field w-input" data-name="Name" id="name" maxLength="256" name="name" placeholder="Not Necessary" required="required" type="text"/>
                  <label className="field-head" htmlFor="Password">Password:</label>
                  <input className="box-field w-input" data-name="Password" id="Password" maxLength="256" name="Password" placeholder="Not Necessary" type="password"/>
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form</div>
                </div>
              </div><a className="form log-in w-button" href="/prescriptions">Enter</a><img className="city2" sizes="(max-width: 479px) 100vw, (max-width: 767px) 400px, (max-width: 991px) 374px, 400px" src="assets/Log Out City.png" srcSet="assets/Log%20Out%20City.png 500w, assets/Log%20Out%20City.png 800w, assets/Log%20Out%20City.png 1080w, assets/Log%20Out%20City.png 1600w, assets/Log%20Out%20City.png 1872w" width="400"/>
            </div>
            <div className="w-col w-col-6"><img className="big-remi" data-ix="bounce-on-load" height="500" sizes="(max-width: 479px) 100vw, 258.015625px" src="assets/Big%20Remi.png" srcSet="assets/Big%20Remi.png 500w, assets/Big%20Remi.png 643w"/>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
