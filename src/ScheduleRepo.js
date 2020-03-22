import API from '@aws-amplify/api';
import awsconfig from './aws-exports';

API.configure(awsconfig);

export async function getData() {
    let apiName = 'schedule';
    let path = '/schedule/20200321/doc1';
    let myInit = { // OPTIONAL
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
  return await API.get(apiName, path, myInit);
}

export async function getMyPosition(patientId) {
  console.log(`getMyPosition: ${patientId}`);
  return {
    "position": 5,
    "scheduleTime": "10:40",
    "praxis": "Dr. Lehmann",
    "delay": "medium"
  };
}

export async function postData(props) {
  let apiName = 'schedule';
  let path = '/schedule/20200321';
  let myInit = {
      body: {
        "date_patient": (getFormattedDate(new Date()) + "$" + props.id).substring(0,100),
        "doctor_id":    "doc1",
        "duration_min": (props.duration_min).substring(0,4),
        "patient_id":   (props.name).substring(0,100),
        "time":         (props.time).substring(0,5),
        "wait_state": "ausstehend"
      },
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
  };
  return await API.post(apiName, path, myInit);
}

export async function deleteData(key) {
  let apiName = 'schedule';
  let path = '/schedule/20200321/object/doc1/' + key;
  let myInit = {
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
  };
  return await API.del(apiName, path, myInit);
}

export async function invitePatient(key) {
  return await deleteData(key);
}

export function generatePatientId() {
  return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 10 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(10);
  });
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + month + day;
}
  
