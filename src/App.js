import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';

import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <Router>

        <Header></Header>

        <Nav></Nav>

        {/* Body */}
        <Switch>
          <Route path="/"></Route>

        </Switch>

      </Router>
    );
  }
  
}