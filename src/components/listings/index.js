import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap'
import { getListings } from '../../containers/listings/actions';
import Listing from './Listing'
import './styles.css'

class Listings extends Component {
  componentDidMount() {
    if (!this.props.listingsLoaded && !this.props.listingsSuccess) {
      this.props.getListings();
    }
  }

  render() {
    const listings = Object.keys(this.props.listings).map(id => this.props.listings[id]);
    return (
      <div className="container">
        <h1>Listings</h1>
          <ListGroup>
            {listings.map(({ dataHash, dataUri, metadata, owner }) =>
              <Listing
                key={dataHash}
                dataHash={dataHash}
                dataUri={dataUri}
                metadata={metadata}
                owner={owner}
                value='100000000000000' // 2 cents around
              />
            )}
          </ListGroup>
      </div>
    )
  }
}

const mapState = state => (
  {
    listings: state.listings.data,
    listingsLoaded: state.listings.listingsLoaded,
    listingsSuccess: state.listings.listingsSuccess,
  }
);

export default connect(mapState, { getListings })(Listings);
