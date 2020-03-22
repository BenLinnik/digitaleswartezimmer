import React from 'react';
import Async from 'react-async';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflowX: 'hidden'
  },
  hidden: { display: 'none' },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


  
  
function MyPositionGrid(props) {
    const datasource = props.data;

    const [wn, setWN] = React.useState('');

    const handleWN = event => {
        setWN(event.target.value);
    };
    const classes = useStyles();

    console.log(props.data)
    
    return (
    <div className={classes.root}>
        <Grid container spacing={3} className={props.data.position ? '' : classes.hidden }>
            <Grid item md></Grid>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                    <Typography variant="h5" gutterBottom>
                        Herzlich willkommen
                    </Typography>
                    <p>in der virtuellen Warteliste der Arztpraxis
                        <br/>{datasource.praxis}
                        <br/>
                    </p>
                    <p>
                        Anzahl Patienten vor dir: {datasource.position}
                        <br/> Aktuelle Wartezeit: {datasource.delay}
    
                    </p>
    
                    Voraussichtlicher Behandlungsbeginn:
                    <br/>
                    <span style={{color: 'blue'}}>{datasource.scheduleTime} Uhr</span>
                    <p>
                        <Button href="https://1d581d65f8334e24ab9c933e6ebf7bb9.vfs.cloud9.eu-central-1.amazonaws.com/my-position" variant="contained" color="primary" disableElevation>
                            Aktualisieren
                        </Button>
                    </p>
                </Paper>
            </Grid>
            <Grid item md></Grid>
        </Grid>
        <Grid container spacing={3} className={props.data.position ? classes.hidden : ''}>
            <Grid item md>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                    <p>Bitte geben Sie die Ihnen zugewiesene Wartenummer ein:</p>
                    <FormControl>
    
                        <form noValidate autoComplete="off">
                            <TextField label="Wartenummer" id="wartenummer" defaultValue="" variant="outlined" />
                            <p>
                                <Button onClick={()=> { handleWN(); }} href="https://1d581d65f8334e24ab9c933e6ebf7bb9.vfs.cloud9.eu-central-1.amazonaws.com/my-position" variant="contained" color="primary" disableElevation> In die Warteliste eintragen
                                </Button>
                            </p>
    
                        </form>
                    </FormControl>
    
                </Paper>
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
    </div>
    );
}

export default function MyPosition(props) {
    const datasource = props.data;
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <Async promiseFn={datasource}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {data => {
            return (
              <MyPositionGrid data={data} />
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