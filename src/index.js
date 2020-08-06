
import 'Assets/css/fonts.css';

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";

import Home from "Views/Home";
import Breakpoints from 'Tech/Breakpoints';
import RouteUpdateHandler from 'Tech/RouteUpdateHandler';

import './index.css';
import Backdrop from 'Components/WebGL/Backdrop';
import BackgroundScene from 'Components/WebGL/TestIcoBackgroundScene';

var hist = createBrowserHistory();

window.resetPath = false;

const ResetHomePath = withRouter(({location, history}) => {
    if(window.resetPath) return null;

    if(location.hash !== "") {
        history.push(location.hash.replace('#', ''));
    }
    // add a check here for redirected to projects

    window.resetPath = true;
    return null;
});

ReactDOM.render(
    <Router history={hist} basename={process.env.PUBLIC_URL}>
       
        <Breakpoints>
            <RouteUpdateHandler />
            <ResetHomePath />
            <Switch>
                <Route path="" component={Home}/>
            </Switch>
        </Breakpoints>
      
    </Router>,
    document.getElementById("root")
);
