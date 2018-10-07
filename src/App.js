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
	    "fps_limit": 28,
	    "particles": {
	        "number": {
	            "value": 200,
	            "density": {
	                "enable": false
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "distance": 30,
	            "opacity": 0.4
	        },
	        "move": {
	            "speed": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "opacity_min": 0.05,
	                "speed": 2,
	                "sync": false
	            },
	            "value": 0.4
	        }
	    },
	    "polygon": {
	        "enable": true,
	        "scale": 0.2,
	        "type": "inline",
	        "move": {
	            "radius": 10
	        },
	        "url": "/eth.svg",
	        "inline": {
	            "arrangement": "equidistant"
	        },
	        "draw": {
	            "enable": true
	        }
	    },
	    "retina_detect": false,
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "size": 6,
	                "distance": 40
	            }
	        }
	    }
	}} />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
