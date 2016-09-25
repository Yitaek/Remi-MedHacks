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
          <div className="dash-break"><img className="break-line" height="10" src="assets/Break%20Line.png"/>
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
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/logout"><img className="nav-icon" src="assets/Log%20Out%20Button.png" width="20"/>
              <div className="side-nav-text">Log Out</div>
            </a>
          </div>
        </div>
        <div className="main">
          <div className="top-nav-bar w-clearfix"><a className="emergency-button w-button" href="#">Emergency</a>
            <div className="page-header">Welcome to Remi</div>
          </div>
          <div className="first-section w-clearfix"><img className="pharmacy-image" height="50" src="assets/Doctors.png"/>
            <h2 className="main-header">Your Doctors</h2><a className="button find-doctors w-button" href="settings.html">Find Doctors</a>
          </div>
          <div className="first-section">
            <div className="w-row">
              <div className="w-col w-col-4">
                <div className="box-design">
                  <h1 className="box-heading">Primary Care Physician</h1><img className="doctor-headshot" height="150" sizes="(max-width: 479px) 63vw, 150px" src="assets/primary%20care-01.png" srcSet="assets/primary%20care-01-p-500x500.png 500w, assets/primary%20care-01-p-800x800.png 800w, assets/primary%20care-01-p-1080x1080.png 1080w, assets/primary%20care-01-p-1600x1600.png 1600w, assets/primary%20care-01.png 1667w"/>
                  <div className="doctors doses-section">
                    <div className="doctor-name per-day-text">Dr. Charlyn Mortyn</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Last Visit</div>
                    <div className="doctor number per-day-text">01/14/2016</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Next Visit</div>
                  </div>
                  <div className="doses-section left w-clearfix">
                    <div className="per-day-text">Contact</div>
                    <div className="doctor-number">987-938-2938</div>
                  </div>
                </div>
                <div className="add-a-doctor box-design"><img className="add-a-doctor" height="170" sizes="(max-width: 479px) 65vw, 155px" src="assets/Add%20Doctor.png" srcSet="assets/Add%20Doctor-p-500x500.png 500w, assets/Add%20Doctor-p-800x800.png 800w, assets/Add%20Doctor-p-1080x1080.png 1080w, assets/Add%20Doctor.png 1585w"/>
                  <h1 className="add-a-doctor-text box-heading">Add A Doctor</h1>
                </div>
              </div>
              <div className="w-col w-col-4">
                <div className="box-design">
                  <h1 className="box-heading">Eye Doctor</h1><img className="doctor-headshot" height="150" sizes="(max-width: 479px) 63vw, 150px" src="assets/Eye%20Doctor-01.png" srcSet="assets/Eye%20Doctor-01-p-500x500.png 500w, assets/Eye%20Doctor-01-p-800x800.png 800w, assets/Eye%20Doctor-01-p-1080x1080.png 1080w, assets/Eye%20Doctor-01-p-1600x1600.png 1600w, assets/Eye%20Doctor-01.png 1667w"/>
                  <div className="doctors doses-section">
                    <div className="doctor-name per-day-text">Dr. Efraim Saltzman</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Last Visit</div>
                    <div className="doctor number per-day-text">08/27/2015</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Next Visit</div>
                    <div className="doctor number per-day-text">10/27/2016</div>
                  </div>
                  <div className="doses-section left w-clearfix">
                    <div className="per-day-text">Contact</div>
                    <div className="doctor-number">459-390-9872</div>
                  </div>
                </div>
              </div>
              <div className="w-col w-col-4">
                <div className="box-design">
                  <h1 className="box-heading">Dentist</h1><img className="doctor-headshot" height="150" sizes="(max-width: 479px) 63vw, 150px" src="assets/detist-01.png" srcSet="assets/detist-01-p-500x500.png 500w, assets/detist-01-p-800x800.png 800w, assets/detist-01.png 1000w"/>
                  <div className="doctors doses-section">
                    <div className="doctor-name per-day-text">Dr. Jack Fritzinger</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Last Visit</div>
                    <div className="doctor number per-day-text">08/27/2015</div>
                  </div>
                  <div className="doses-section w-clearfix">
                    <div className="per-day-text">Next Visit</div>
                    <div className="doctor number per-day-text"><span className="overdue">Overdue</span>
                    </div>
                  </div>
                  <div className="doses-section left w-clearfix">
                    <div className="per-day-text">Contact</div>
                    <div className="doctor-number">758-078-9842</div>
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
