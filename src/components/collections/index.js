import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollection } from '../../containers/web3/actions';

class Collections extends Component {
  componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollection()
  }

  render() {
    return (<div>Collections page</div>)
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

export default connect(mapState, {getCollection})(Collections);
