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

    
    
    return (
<div className="root">
    <Grid container spacing={3}>
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
    <Grid container spacing={3}>
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

function MyPositionInputNumber(props) {
    const datasource = props.data;
    return (
   <Grid className={this.props.status ? 'hidden' : ''}  container spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper>xs</Paper>
          </Grid>
          <Grid item xs>
                        <Paper variant="outlined">
              <h2>Herzlich willkommen,</h2>
              <p>in der virtuellen Warteliste ihrer Arztpraxis.<br/>
              </p>
              <p>Bitte geben Sie die Ihnen zugewiesene Wartenummer ein:</p>
              <form  noValidate autoComplete="off">
                <TextField
                  label="Wartenummer"
                  id="wartenummer"
                  defaultValue=""
                  variant="outlined"
                />
                  <p>
                    <Button href="https://1d581d65f8334e24ab9c933e6ebf7bb9.vfs.cloud9.eu-central-1.amazonaws.com/my-position" variant="contained" color="primary" disableElevation>
                      In die Warteliste eintragen
                    </Button>
                  </p>
  
              </form>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>xs</Paper>
          </Grid>
        </Grid>
      </Grid>

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