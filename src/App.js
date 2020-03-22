import React from 'react';
import API from '@aws-amplify/api';
import './App.css';
import MyPosition from './MyPosition';
import Schedule from './Schedule';
import {getData, getMyPosition} from './ScheduleRepo';
import Footer from './Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
      <div className="App">
        <Switch>
          <Route path='/my-position'>
            <MyPosition data={getMyPosition} />
          </Route>
          <Route path='/schedule'>
            <Schedule table={getData} scheduleDate='21.03.2020' />
          </Route>
        </Switch>
      </div>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
