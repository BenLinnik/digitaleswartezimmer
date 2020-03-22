import React from 'react';
import API from '@aws-amplify/api';
import './App.css';
import MyPosition from './MyPosition';
import Schedule from './Schedule';
import TableTest from './TableTest'
import awsconfig from './aws-exports';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

API.configure(awsconfig);

async function getData() {
    let apiName = 'schedule';
    let path = '/schedule/20200321/doc1';
    let myInit = { // OPTIONAL
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
  return await API.get(apiName, path, myInit)
}

async function getMyPosition() {
  return {
    "position": 5,
    "scheduleTime": "10:40",
    "praxis": "Dr. Lehmann",
    "delay": "medium"
  };
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/my-position'>
            <MyPosition data={getMyPosition} />
          </Route>
          <Route path='/schedule'>
            <Schedule table={getData} scheduleDate='21.03.2020'/>
          </Route>
          <Route path='/test'>
           <TableTest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
