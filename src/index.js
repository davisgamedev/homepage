
import 'Assets/css/fonts.css';

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";
import BackgroundThreeScene from 'Components/Scene/BackgroundThreeScene';

// import Home from "Views/Home";
// import Breakpoints from 'Tech/Breakpoints';
// import RouteUpdateHandler from 'Tech/RouteUpdateHandler';

 import './index.css';

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

// setTimeout(() => {
//     var canvas = document.getElementById("myFogCanvas");
//     var ctx = canvas.getContext('2d');
//     //all the drawing stuff for canvas ... moveTo, lineTo, etc.
//     ctx.filter = 'blur(15px)';
//     ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
//     ctx.lineWidth = 5;
//     ctx.stroke();

//     console.log("mounted");

// }, 5000);

ReactDOM.render(
    <Router history={hist} basename={process.env.PUBLIC_URL}>
       
        {/* <Breakpoints>
            <RouteUpdateHandler />
            <ResetHomePath />
            <Switch>
                <Route path="" component={Home}/>
            </Switch>
        </Breakpoints> */}
      
      <BackgroundThreeScene />
       {/* <div style={{
           position: 'absolute',
           top: 200,
           left: 0,
           width: '100%',
           height: 40000,
           zIndex: 100000000,
           fontSize: 100,
           overflow: 'scroll',
       }}
       id="important"
       >
           Hello
           <canvas id="myFogCanvas"></canvas>
       </div>
       <div style={{position: "relative", top: 400000}}>Scroll to me</div> */}

    </Router>,
    document.getElementById("root")
);
