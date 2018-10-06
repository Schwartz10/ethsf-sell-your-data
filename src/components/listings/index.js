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
        {/* <div className="col"> */}
          <ListGroup>
            {listings.map(({ dataHash, dataUri, metadata, owner }) =>
              <Listing
                key={dataHash}
                dataHash={dataHash}
                dataUri={dataUri}
                metadata={metadata}
                owner={owner}
              />
            )}
          </ListGroup>
        {/* </div> */}
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
