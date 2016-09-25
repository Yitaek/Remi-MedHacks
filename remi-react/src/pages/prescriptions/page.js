import React from 'react';
import { browserHistory } from 'react-router';
import styles from './remy-725b20.webflow.css';
import firebase from 'firebase';
import {PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import AdherencePieChart from './AdherencePieChart';
import AdherenceTable from './AdherenceTable';
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
      <div className={'page' + ' ' + styles['w-clearfix']}>
        <div className={styles['left-side-bar']}>
          <div className={styles['logo-div']}>
            <div className={styles['logo-container'] + ' ' + styles['w-container']}>
              <a className={styles['logo-link-block'] + ' ' + styles['w-inline-block']} href="/prescriptions"><img className={styles['remi-logo}']} sizes="(max-width: 479px) 33vw, (max-width: 991px) 15vw, 120px" src="assets/Remi%20Logo%202.png" srcSet="assets/Remi%20Logo%202.png 500w, assets/Remi%20Logo%202.png 800w, assets/Remi%20Logo%202.png 1080w, assets/Remi%20Logo%202.png 1093w" width="120" />
              </a>
            </div>
          </div>
          <div className={styles['w-container']}>
            <div className={styles['account-container']}><img className={styles['account-holder-image']} sizes="(max-width: 479px) 43vw, 15vw" src="assets/Person%20Icon.png" srcSet="assets/Person%20Icon.png 500w, assets/Person%20Icon.png 800w, assets/Person%20Icon.png 1040w"/>
              <h3 className={styles['user-name']}>Calum</h3>
            </div>
          </div>
          <div className={styles['dash-break}']}><img className={styles['break-line']} height="10" src="assets/Break%20Line.png"/>
          </div>
          <div className="nav-div w-clearfix">
            <a className="dashboard-link-block w-clearfix w-inline-block" href="/prescriptions"><img className="nav-icon" src="assets/Dashboard1.png" width="20"/>
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
        <div className={styles['main']}>
          <div className={styles['top-nav-bar'] + ' ' + styles['w-clearfix']}><a className={styles['emergency-button'] + ' ' + styles['w-button']} href="#">Emergency</a>
            <div className={styles['page-header']}>Calum's Dashboard</div>
          </div>
          <div className={styles['first-section']}>
            <div className={styles['w-row']}>
              <div className={styles['w-col'] + ' ' + styles['w-col-4']}>
                <div className={styles['box-design']}>
                  <div className={styles['month-overview-container'] + ' ' + styles['w-container']}>
                    <h3 className={styles['box-heading']}>This Month</h3>
                    <div className={styles['circle-graphic']}>
                      <AdherencePieChart />
                    </div>
                    <div className={styles['bullets-row'] + ' ' + styles['w-row']}>
                      <div className={styles['w-col'] + ' ' + styles['w-col-6']}>
                        <div className={styles['month-bullets'] + ' ' + styles['w-clearfix']}><img className={styles['dose-taken-circle']} height="15" src="assets/Green%20Circle.png"/>
                          <div className={styles['does-taken-text']}>Dose Taken</div>
                        </div>
                        <div className={styles['month-bullets'] + ' ' + styles['w-clearfix']}><img className={styles['dose-taken-circle']} height="15" src="assets/Red%20Circle.png"/>
                          <div className={styles['does-taken-text']}>Dose Missed</div>
                        </div>
                      </div>
                      <div className={styles['w-col'] + ' ' + styles['w-col-6']}>
                        <div className={styles['month-bullets'] + ' ' + styles['w-clearfix']}><img className={styles['dose-taken-circle']} height="15" src="assets/Grey%20Circle.png"/>
                          <div className={styles['does-taken-text']}>No Dose Data</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['w-col'] + ' ' + styles['w-col-8']}>
                <div className={styles['box-design']}>
                  <div className={'_10-days-container' + ' ' + styles['w-container']}>
                    <h3 className={styles['box-heading']}>Past 10 Days</h3>
                    <div className={styles['table-div']}>
                      <AdherenceTable />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['first-section']}>
            <div className={styles['w-row']}>
              <div className={styles['w-col'] + ' ' + styles['w-col-4']}>
                <div className={styles['box-design']}>
                  <div className={styles['month-overview-container'] + ' ' + styles['refills'] + ' ' + styles['w-container']}>
                    <h3 className={styles['box-heading']}>Upcoming Refills</h3>
                    <div className={styles['nav-div-refills']}>
                      <div className={styles['w-row']}>
                        <div className={styles['w-col'] + ' ' + styles['w-col-6']}>
                          <a className={styles['refills-link'] + ' ' + styles['w-inline-block']} href="#">
                            <div className={styles['refills-link-text']}>This Month</div>
                          </a>
                        </div>
                        <div className={styles['w-col'] + ' ' + styles['w-col-6']}>
                          <a className={styles['refills-link'] + ' ' + styles['w-inline-block']} href="#">
                            <div className={styles['refills-link-text']}>By Pill</div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={styles['drug-dropdown-place'] + ' ' + styles['w-dropdown']} data-delay="0" data-hover="1">
                      <FormControl componentClass="select" placeholder="Pill" className={styles.drugDropdownSelector}>
                        <option value="hydrocodone">Hydrocodone</option>
                        <option value="link2">link2</option>
                      </FormControl>
                    </div>
                    <div className={styles['table-row']}>
                      <div className={styles['drug-table-text']}>HYC</div>
                      <div className={styles['date'] + ' ' + styles['drug-table-text']}>09/25/16</div><a className={styles['pick-up-button'] + ' ' + styles['w-button']} href="#">Schedule Pick Up</a>
                    </div>
                    <div className={styles['table-row']}>
                      <div className={styles['drug-table-text']}>HYC</div>
                      <div className={styles['date'] + ' ' + styles['drug-table-text']}>10/25/16</div><a className={styles['inactive'] + ' ' + styles['pick-up-button'] + ' ' + styles['w-button']} href="#">Schedule Pick Up</a>
                    </div>
                    <div className={styles['table-row']}>
                      <div className={styles['drug-table-text']}>HYC</div>
                      <div className={styles['date'] + ' ' + styles['drug-table-text']}>11/25/16</div><a className={styles['inactive'] + ' ' + styles['pick-up-button'] + ' ' + styles['w-button']} href="#">Schedule Pick Up</a>
                    </div>
                    <div className={styles['table-row']}>
                      <div className={styles['drug-table-text']}>HYC</div>
                      <div className={styles['date'] + ' ' + styles['drug-table-text']}>12/25/16</div><a className={styles['inactive'] + ' ' + styles['pick-up-button'] + ' ' + styles['w-button']} href="#">Schedule Pick Up</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['w-col'] + ' ' + styles['w-col-8']}><img className={styles['remi']} data-ix="bounce-on-load" src="assets/Remi.png"/>
                <div className={styles['speech-bubble']}>
                  <h4 className={styles['greeting-text']} data-ix="fade-in-header">Hi Calum,</h4>
                  <div className={styles['welcome-text']} data-ix="fade-in-header-2">Welcome to Remi Dashboard!
                    <br/>If you have any questions, click on <span className={styles['green-text']}><strong xmlns="http://www.w3.org/1999/xhtml">Remi Chat</strong></span> below.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
