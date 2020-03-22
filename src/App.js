import React from 'react';
import API from '@aws-amplify/api';
import './App.css';
import MyPosition from './MyPosition';
import AskPosition from './AskPosition';
import ShowPosition from './ShowPosition';
import Schedule from './Schedule';
import {getData, getMyPosition} from './ScheduleRepo';
import Footer from './Footer';
import { useParams } from "react-router-dom";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function ShowPositionWithPatientId() {
  const {patientId} = useParams();
  return (
    <ShowPosition data={() => getMyPosition(patientId)} patientId={patientId}/>
  );
}

function App() {
  return (
    <div>
    <Router>
      <div className="App">
        <Switch>
          <Route path='/my-position/:patientId'>
            <ShowPositionWithPatientId/>
          </Route>
          <Route path='/my-position'>
            <AskPosition/>
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
