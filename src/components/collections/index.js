import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../../containers/collections/actions';

class Collections extends Component {
  componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollections()
  }

  render() {
    return (
      <div className="container">
        <h1>Listings I own</h1>
      </div>
    )
  }
}

const mapState = state => (
  {
    collections: state.collections.data,
    collectionsLoading: state.collections.collectionsLoading,
    collectionsLoaded: state.collections.collectionsLoaded,
    collectionsSuccess: state.collections.collectionsSuccess,
  }
)

export default connect(mapState, {getCollections})(Collections);
