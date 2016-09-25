import React from 'react';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
import {PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {FormControl} from 'react-bootstrap';
import styles from './styles.css';
import {Map, Marker, InfoWindow} from 'google-maps-react';

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
      <div>
        <div className="left-side-bar">
          <div className="logo-div">
            <div className="logo-container w-container">
              <a className="logo-link-block w-inline-block" href="/dashboard"><img className="remi-logo" sizes="(max-width: 479px) 23vw, (max-width: 991px) 15vw, 120px" src="assets/Remi%20Logo%202.png" srcSet="assets/Remi%20Logo%202-p-500x209.png 500w, assets/Remi%20Logo%202-p-800x334.png 800w, assets/Remi%20Logo%202-p-1080x450.png 1080w, assets/Remi%20Logo%202.png 1093w" width="120"/>
              </a>
            </div>
          </div>
          <div className="w-container">
            <div className="account-container"><img className="account-holder-image" sizes="(max-width: 479px) 31vw, 15vw" src="assets/Person%20Icon.png" srcSet="assets/Person%20Icon-p-500x500.png 500w, assets/Person%20Icon-p-800x800.png 800w, assets/Person%20Icon.png 1040w"/>
              <h3 className="user-name">Calum</h3>
            </div>
          </div>
          <div className="dash-break"><img className="break-line" height="10" src="assets/Break Line.png"/>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/dashboard"><img className="nav-icon" src="assets/Dashboard1.png" width="20"/>
              <div className="side-nav-text">Dashboard</div>
            </a>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/doses"><img className="nav-icon" src="assets/Doses.png" width="20"/>
              <div className="side-nav-text">Doses</div>
            </a>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/pharmacy"><img className="nav-icon" src="assets/Pharmacy.png" width="20"/>
              <div className="side-nav-text">Pharmacy</div>
            </a>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/doctors"><img className="nav-icon" src="assets/Doctors.png" width="20"/>
              <div className="side-nav-text">Doctors</div>
            </a>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/settings"><img className="nav-icon" src="assets/Insurance.png" width="20"/>
              <div className="side-nav-text">Insurance</div>
            </a>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/logout"><img className="nav-icon" src="assets/Log Out Button.png" width="20"/>
              <div className="side-nav-text">Log Out</div>
            </a>
          </div>
        </div>
        <div className="main">
          <div className="top-nav-bar w-clearfix"><a className="emergency-button w-button" href="#">Emergency</a>
            <div className="page-header">Welcome to Remi</div>
          </div>
          <div className="first-section w-clearfix"><img className="pharmacy-image" height="50" src="assets/Pharmacy.png"/>
            <h2 className="main-header">Your Pharmacy</h2>
            <div className="open-or-closed-text">Open Now!</div>
          </div>
          <div className="first-section">
            <div className="w-row">
              <div className="w-col w-col-4">
                <div className="box-design">
                  <div className="w-container">
                    <h1 className="box-heading">Pharmacy Hours</h1>
                  </div>
                  <div className="pharmacy-hours-div w-clearfix">
                    <div className="pharmacy-days-text">Monday
                      <br/>Tuesday
                      <br/>Wednesday
                      <br/>Thursday
                      <br/>Friday
                      <br/>Saturday
                      <br/>Sunday</div>
                    <div className="hours pharmacy-days-text">9:00am-7:00pm
                      <br/>9:00am-7:00pm
                      <br/>9:00am-7:00pm
                      <br/>9:00am-7:00pm
                      <br/>9:00am-5:00pm
                      <br/>10:00am-4:00pm
                      <br/>Closed</div>
                  </div>
                </div><a className="edit-your-pharmacy w-button" href="#">Edit Your Pharmacy</a>
              </div>
              <div className="w-col w-col-8">
                <div className="box-design">
                  <div className="_10-days-container w-container">
                    <h3 className="box-heading">Pharmacy Location</h3>
                    <div className="table-div w-clearfix">
                      <div className="street-adress">2410 N Charles Street</div>
                      <div className="street-adress">Baltimore, Maryland</div>
                      <br />
                      <iframe src="//www.google.com/maps/embed/v1/place?q=2410%20N%20Charles%20Street,%20Baltimore,%20Maryland
                          &zoom=17
                          &key=AIzaSyAHjxESuQU2SN9Teong99IUZ0Q9wXp_QoY"
                          className={styles.googleMaps}>
                      </iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
