import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InviteIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';

  const useStyles = makeStyles(theme => ({
    noOverflow: {
      overflow: 'hidden'
    },
  }));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ScheduleTable(props) {
  const entries = props.entries;
  const handleAdd = props.handleAdd;
  const handleDelete = props.handleDelete;
  const handleInvite = props.handleInvite;
  const classes = useStyles();
  
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  
  return (
    <div className={classes.root}>
    <TableContainer component={Paper} className={classes.noOverflow}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Termin</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Behandlungsdauer</TableCell>
            <TableCell padding="checkbox">Status</TableCell>
            <TableCell align="right" padding="checkbox"></TableCell>
            <TableCell align="right" padding="checkbox">  
              <Tooltip title="Patient hinzufügen">
                  <IconButton onClick={handleAdd} aria-label="add">
                    <AddIcon color="primary"/>
                  </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
           entries.map(entry => (
             <TableRow key={entry.date_patient}>
               <TableCell>{entry.time}</TableCell>
               <TableCell>{entry.patient_id}</TableCell>
               <TableCell>{entry.duration_min}</TableCell>
               <TableCell padding="checkbox">{entry.wait_state}</TableCell>
               <TableCell size="small" align="right" padding="checkbox">     
                <Tooltip title="Patient reinrufen" aria-label="invite">
                 <IconButton onClick={e => { handleInvite(entry.date_patient); setNotificationOpen(true);}}>
                   <InviteIcon color="primary"/>
                 </IconButton>
                 </Tooltip>
              <Snackbar open={notificationOpen} autoHideDuration={6000}>
                <Alert severity="success">
                  Patient {entry.patient_id} wird informiert!
                </Alert>
              </Snackbar>
              </TableCell>
               <TableCell size="small" align="right" padding="checkbox">
                <Tooltip title="Warteposition löschen" aria-label="delete">
                 <IconButton onClick={e => handleDelete(entry.date_patient)}>
                   <DeleteIcon color="secondary"/>
                 </IconButton>
                </Tooltip>
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