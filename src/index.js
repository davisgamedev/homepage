
import 'Assets/css/fonts.css';

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";

import Home from "Views/Home";

import Breakpoints from 'Tech/Breakpoints';

import './index.css';

var hist = createBrowserHistory();

window.updatedPath = false;

const ClearHomepageUrl = withRouter(({location, history}) => {
    if(window.updatedPath) return null;

    const paths = location.pathname.split('/').filter(x=>x); // filter removes empty strings

    const newPath = paths.reduce(
        (acc, val) => acc += (val !== "homepage") ? '/' + val : "", "");
        
    if(newPath !== location.pathname) history.push(newPath);

    window.updatedPath = true;
    return null;
});

ReactDOM.render(
    <Router history={hist}>
        <Breakpoints>
            <ClearHomepageUrl />
            <Switch>
                {/* <Route path="/examples/components" component={Components} /> */}
                <Route path="/" component={Home}/>
            </Switch>
        </Breakpoints>
    </Router>,
    document.getElementById("root")
);
