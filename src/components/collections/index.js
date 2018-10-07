import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollection } from '../../containers/web3/actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import LineChart from './Chart';

class Collections extends Component {
  componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollection()

  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>
          <div className="col-lg-12 col-xs-10 ">
            <LineChart data={this.props.collections}/>
          </div>
        </ListGroupItem>
      </ListGroup>
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

export default connect(mapState, {getCollection})(Collections);
