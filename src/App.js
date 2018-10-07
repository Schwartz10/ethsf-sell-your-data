import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/nav';
import Listings from './components/listings';
import Collections from './components/collections';
import './App.css';
import logo from './logo.png';
import { Image } from 'react-bootstrap';
import Particles from 'react-particles-js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Image src={logo} responsive id="logo"/>
        <Route component={Nav} />
        <Switch>
          <Route path="/listings" component={Listings} />
          <Route path="/collections" component={Collections} />
          <Redirect to="/listings" />
        </Switch>
        <Particles
            params={{
        	    "particles": {
        	        "number": {
        	            "value": 160,
        	            "density": {
        	                "enable": false
        	            }
        	        },
        	        "size": {
        	            "value": 10,
        	            "random": true
        	        },
        	        "move": {
        	            "direction": "bottom",
        	            "out_mode": "out"
        	        },
        	        "line_linked": {
        	            "enable": false
        	        }
        	    }
        	}} />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
