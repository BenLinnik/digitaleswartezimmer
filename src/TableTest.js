import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function TableTest(props) {
  const [table, setTable] = React.useState([{
       "doctor_id": "doc1",
       "time": "10:30",
       "patient_id": "pat1",
       "wait_state": "offen"
    }]);
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = React.useState("15");
  const [name, setName] = React.useState("");
  const [time, setTime] = React.useState("10");

  const classes = useStyles();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAbort = () => {
    setOpen(false);
  };
  
  const handleAdd = () => {
    setOpen(false);
    console.log(`name: ${name}, time: ${time}, duration: ${duration}`);
    setName("");
    setTime("10");
    setDuration("15");
  };
  
  return (
    <div>
      <Dialog open={open} onClose={handleAbort} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Patient einfügen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            WartenummerId: 23654
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Uhrzeit</InputLabel>
            <Select
              labelId="schedule-time"
              id="schedule-time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            >
              <MenuItem value={10}>10:00</MenuItem>
              <MenuItem value={20}>10:15</MenuItem>
              <MenuItem value={30}>10:30</MenuItem>
              <MenuItem value={40}>10:45</MenuItem>
              <MenuItem value={50}>11:00</MenuItem>
              <MenuItem value={60}>11:15</MenuItem>
              <MenuItem value={70}>11:30</MenuItem>
              <MenuItem value={80}>11:45</MenuItem>
              <MenuItem value={90}>12:00</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="duration"
            label="Geschätzte Dauer (min)"
            type="number"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAbort} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleAdd} color="primary">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Termin</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
             table.map(entry => (
               <TableRow key={entry.doctor_id}>
                 <TableCell>{entry.time}</TableCell>
                 <TableCell>{entry.patient_id}</TableCell>
                 <TableCell>{entry.wait_state}</TableCell>
                 <TableCell>      
                    <IconButton onClick={handleClickOpen} aria-label="add">
                      <AddIcon />
                    </IconButton>
                </TableCell>
               </TableRow>
             ))
          }
          </TableBody>
          </Table>
      </TableContainer>
    </div>
  );
}