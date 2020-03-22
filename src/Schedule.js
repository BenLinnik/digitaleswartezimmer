import React from 'react';
import Async from 'react-async';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleTable from './ScheduleTable'
import {KeyboardDatePicker} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {postData, deleteData, generatePatientId, invitePatient} from './ScheduleRepo';


export default function Schedule(props) {
  
  const scheduleDate = props.scheduleDate;
  const table = props.table;
  
  const [dialogWatch, setDialogWatch] = React.useState(false);
  const [patientId, setPatientId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = React.useState("15");
  const [name, setName] = React.useState("");
  const [time, setTime] = React.useState("10");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
      overflow: 'hidden'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  const classes = useStyles();
  
  function getFormattedDate(date) {
    var year = date.getFullYear();
    
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + month + day;
  }
  
  const handleEntryPost = async () => {
    setOpen(false);
    const entry = {
      name,
      "duration_min": duration,
      "id": patientId,
      time
    };
    console.log(`posting: ${JSON.stringify(entry)}`);
    postData(entry);
    await sleep(1000);
    setDialogWatch(!dialogWatch);
  };
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const handleDialogOpen = () => {
    const newId = generatePatientId();
      setPatientId(newId);
  };
  
  const handleDelete = async (id) => {
    await deleteData(id);
    await sleep(1000);
    setDialogWatch(!dialogWatch);
  };
  
  const handleInvite = async (id) => {
    await invitePatient(id);
    await sleep(5000);
    setDialogWatch(!dialogWatch);
  };
  
  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item md></Grid>
        <Grid item xs={12} md={6}>
            <Paper variant="outlined">

                <header>
                    <Typography variant="h5" gutterBottom>
                        Ihre Patienten Warteliste
                    </Typography>

                    <KeyboardDatePicker disableToolbar variant="inline" format="dd.MM.yyyy" margin="normal" id="date-picker-inline" label="Tag wählen" value={selectedDate} onChange={(date)=> setSelectedDate(date)} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                </header>
                <Dialog open={open} onEnter={handleDialogOpen} onClose={()=> setOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Patient einfügen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            WartenummerId: {patientId}
                        </DialogContentText>
                        <TextField autoFocus required margin="dense" id="name" label="Name" fullWidth value={name} onChange={(event)=> setName(event.target.value)} />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Uhrzeit</InputLabel>
                                <Select labelId="schedule-time" id="schedule-time" value={time} onChange={(event)=> setTime(event.target.value)} >
                                    <MenuItem value={ "10:00"}>10:00</MenuItem>
                                    <MenuItem value={ "10:15"}>10:15</MenuItem>
                                    <MenuItem value={ "10:30"}>10:30</MenuItem>
                                    <MenuItem value={ "10:45"}>10:45</MenuItem>
                                    <MenuItem value={ "11:00"}>11:00</MenuItem>
                                    <MenuItem value={ "11:15"}>11:15</MenuItem>
                                    <MenuItem value={ "11:30"}>11:30</MenuItem>
                                    <MenuItem value={ "11:45"}>11:45</MenuItem>
                                    <MenuItem value={ "12:00"}>12:00</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="duration" label="Geschätzte Dauer (min)" type="number" value={duration} onChange={(event)=> setDuration(event.target.value)} InputLabelProps={{ shrink: true, }} variant="filled" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=> setOpen(false)} color="primary"> Abbrechen
                        </Button>
                        <Button onClick={handleEntryPost} color="primary">
                            Hinzufügen
                        </Button>
                    </DialogActions>
                </Dialog>

                <Async promiseFn={props.table} watch={dialogWatch}>
                    <Async.Loading>Loading...</Async.Loading>
                    <Async.Fulfilled>
                        { data => { let data_filtered = data.filter(it => it.date_patient.startsWith(getFormattedDate(selectedDate))); return (
                        <ScheduleTable entries={data_filtered} handleAdd={()=> setOpen(true)} handleDelete={handleDelete} handleInvite={handleInvite}/> ) }}
                    </Async.Fulfilled>
                    <Async.Rejected>
                        {error => `Da ist wohl was schief gelaufen: ${error}`}
                    </Async.Rejected>
                </Async>
            </Paper>
        </Grid>
        <Grid item md></Grid>
    </Grid>
</div>
  );
}