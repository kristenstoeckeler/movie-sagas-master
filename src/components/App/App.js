import React, { Component } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import Home from '../Home/Home';


import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';

class App extends Component {
  render() {
    return (
      <>
      <Router>
          <Route exact path='/' component={Home} />

      </Router>

      </>
    );
  }
}


export default App;

