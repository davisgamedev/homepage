import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "common/assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "common/views/Components/Components.js";
import LandingPage from "common/views/LandingPage/LandingPage.js";
import ProfilePage from "common/views/ProfilePage/ProfilePage.js";
import LoginPage from "common/views/LoginPage/LoginPage.js";

import Fonts from './Tech/Fonts';
import Home from "Views/Home";
import ScrollTo from "Tech/ScrollTo";

var hist = createBrowserHistory();


ReactDOM.render(
  <Router history={hist}>
      <ScrollTo></ScrollTo>
      <Fonts></Fonts>
        <Switch>
          {/* <Route path="/examples/components" component={Components} /> */}
          <Route path="/" component={Home}/>
        </Switch>
  </Router>,
  document.getElementById("root")
);
