import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({});

export default function ScheduleTable(props) {
  const entries = props.entries;
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Termin</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
           entries.map(entry => (
             <TableRow key={entry.doctor_id}>
               <TableCell>{entry.time}</TableCell>
               <TableCell>{entry.patient_id}</TableCell>
               <TableCell>{entry.wait_state}</TableCell>
             </TableRow>
           ))
        }
        </TableBody>
        </Table>
    </TableContainer>
  );
}