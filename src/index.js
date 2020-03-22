import React from 'react';
import { render } from 'react-dom';
import './index.css';
import logo from './logo.png'
import App from './App';
//import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme({
    palette: {
        type: "light",
    }
});

render(
    <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div class="logo-container"><img src={logo} class="logo"></img></div>
            <App />
            
        </MuiPickersUtilsProvider>
    </MuiThemeProvider>, 
    document.getElementById('root')
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
