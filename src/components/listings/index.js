import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { getListings } from '../../containers/listings/actions';

class Listings extends Component {
  componentDidMount() {
    this.props.getListings();
  }

  render() {
    console.log(this.props.listings)
    return (
      <div className="container">

      </div>
    )
  }
}

const mapState = state => (
  {
    listings: state.listings.data
  }
);

export default connect(mapState, { getListings })(Listings);
