import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
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
  
function AskPositionGrid(props) {

    const [wn, setWN] = React.useState('');

    const classes = useStyles();
    
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item md>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                    <p>Bitte geben Sie die Ihnen zugewiesene Wartenummer ein:</p>
                    <FormControl>
    
                        <form noValidate autoComplete="off">
                            <TextField label="Wartenummer" id="wartenummer" variant="outlined" value={wn} onChange={(event)=> setWN(event.target.value)}/>
                            <p>
                              <Link className="btn btn-primary" href={`/my-position/${wn}`}>
                                Aufrufen
                              </Link>
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

export default function AskPosition(props) {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <AskPositionGrid />
    </div>   
    );
}