
import 'Assets/css/fonts.css';

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";
import Scene from 'Components/Scene/Scene';

// import Home from "Views/Home";
// import Breakpoints from 'Tech/Breakpoints';
// import RouteUpdateHandler from 'Tech/RouteUpdateHandler';

// import './index.css';
// import BackgroundFiberDemoScene from 'Components/WebGL/BackgroundFiberDemoScene';
// import IcoBackgroundScene from 'Components/WebGL/IcoBackgroundScene';
// import { Backdrop } from '@material-ui/core';

var hist = createBrowserHistory();

// window.resetPath = false;

// not necessary after migration
// const ResetHomePath = withRouter(({location, history}) => {
//     if(window.resetPath) return null;

//     if(location.hash !== "") {
//         history.push(location.hash.replace('#', ''));
//     }
//     // add a check here for redirected to projects

//     window.resetPath = true;
//     return null;
// });

ReactDOM.render(
    <Router history={hist} basename={process.env.PUBLIC_URL}>
       {/*
        <Breakpoints>
            <RouteUpdateHandler />
            <ResetHomePath />
            <Switch>
                <Route path="" component={Home}/>
            </Switch>
        </Breakpoints>
       */}
       <Scene />
    </Router>,
    document.getElementById("root")
);
