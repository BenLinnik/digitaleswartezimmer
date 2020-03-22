import React from 'react';
import Async from 'react-async';
import ScheduleTable from './ScheduleTable'
import {KeyboardDatePicker} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography'

export default function Schedule(props) {
  
  //Amplify.configure(awsconfig);
  const scheduleDate = props.scheduleDate;
  const table = props.table;
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  
  function getFormattedDate(date) {
    var year = date.getFullYear();
    
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + month + day;
  }
  
  return (
    <div>
      <header>
        <Typography variant="h5" gutterBottom>
          Ihre Patienten Warteliste
        </Typography>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd.MM.yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Tag wählen"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </header>
      <Async promiseFn={props.table}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {
          data => {
            let data_filtered = data.filter(it => it.date_patient.startsWith(getFormattedDate(selectedDate)));
            return (
              <ScheduleTable entries={data_filtered}/>
            )
          }}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => `Something went wrong: ${error}`}
        </Async.Rejected>
      </Async>
    </div>
  );
}