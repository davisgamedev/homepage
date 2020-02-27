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
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
            
          <Nav></Nav>
          <Header></Header>


          {/* Body */}
          <Switch>
            <Route path="/">
              
            </Route>

          </Switch>

        </div>

      </Router>
    );
  }
  
}