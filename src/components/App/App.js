import React, { Component } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';


import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';

class App extends Component {
  render() {
    return (
      <>
      <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/details' component={Details} />
          <Route exact path='/edit' component={Edit} />
      </Router>
      </>
    );
  }
}


export default App;

