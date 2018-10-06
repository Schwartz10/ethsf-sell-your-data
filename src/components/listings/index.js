import React, { Component } from 'react';
import { connect } from 'react-redux';

class Listings extends Component {
  render() {
    return (<div>Listings page</div>)
  }
}

export default connect()(Listings);
