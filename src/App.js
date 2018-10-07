import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/nav';
import Listings from './components/listings';
import Collections from './components/collections';
import './App.css';
import { Image } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route component={Nav} />
        <Switch>
          <Route path="/listings" component={Listings} />
          <Route path="/collections" component={Collections} />
          <Redirect to="/listings" />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
