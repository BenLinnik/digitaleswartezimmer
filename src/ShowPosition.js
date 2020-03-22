import React from 'react';
import Async from 'react-async';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  },
  hidden: { display: 'none' },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
function ShowPositionGrid(props) {
    const datasource = props.data;
    
    const classes = useStyles();
    
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item md></Grid>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                    <Typography variant="h5" gutterBottom>
                        Herzlich willkommen {props.patientId}
                    </Typography>
                    <p>in der virtuellen Warteliste der Arztpraxis
                        <br/>{datasource.praxis}
                        <br/>
                    </p>
                    <p>
                        Anzahl Patienten vor dir: {datasource.position}
                    </p>
    
                    Voraussichtlicher Behandlungsbeginn:
                    <br/>
                    <span style={{color: 'blue'}}>{datasource.scheduleTime} Uhr</span>
                </Paper>
            </Grid>
            <Grid item md></Grid>
        </Grid>
    </div>
    );
}
  
export default function ShowPosition(props) {
    const patientId = props.patientId;
    const datasource = props.data;
    
    const classes = useStyles();
    
    const [dialogWatch, setDialogWatch] = React.useState(false);
    
    const handleRefresh = async () => {
        await sleep(10000);
        setDialogWatch(!dialogWatch);
    };
    
    return (
    <div className={classes.root}>
      <Async promiseFn={datasource} watch={dialogWatch} >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {data => {
            handleRefresh();
            return (
              <ShowPositionGrid data={data} patientId={patientId} />
            );
          }}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => `Something went wrong: ${error.message}`}
        </Async.Rejected>
      </Async>
    </div>   
    );
}