import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/log-in/page';
import HomePage from '../../pages/home/page';
import Prescriptions from '../../pages/prescriptions/page';
import Settings from '../../pages/settings/page';
import Doctors from '../../pages/doctors/page';
import Doses from '../../pages/doses/page';
import LogOut from '../../pages/log-out/page';
import Pharmacy from '../../pages/pharmacy/page';
import Signup from '../../pages/signup/page';
import Thanks from '../../pages/thanks/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
    <Route path="dashboard" component={Prescriptions} />
    <Route path="settings" component={Settings} />
    <Route path="doctors" component={Doctors} />
    <Route path="doses" component={Doses} />
    <Route path="logout" component={LogOut} />
    <Route path="pharmacy" component={Pharmacy} />
    <Route path="text" component={Signup} />
    <Route path="thanks" component={Thanks} />

  </Route>
);
