
import 'Assets/css/fonts.css';

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";

import Home from "Views/Home";

var hist = createBrowserHistory();


ReactDOM.render(
  <Router history={hist}>
        <Switch>
          {/* <Route path="/examples/components" component={Components} /> */}
          <Route path="/" component={Home}/>
        </Switch>
  </Router>,
  document.getElementById("root")
);
