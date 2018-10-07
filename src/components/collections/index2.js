import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollection } from '../../containers/web3/actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import LineChart from './Chart';
import { FormControl, Button } from 'react-bootstrap';
import { getCollections, decrypt } from '../../containers/collections/actions';
import { getData } from '../../containers/web3/actions';

class Collections extends Component {
  componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollection()
  }

  constructor(props){
    super(props);
    this.state = {
      password: null,
    }
    this.onChange = this.onChange.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }

  onChange(password){
    this.setState({ password });
  }

  decrypt() {
    this.props.decrypt(this.props.collections, this.state.password);
    this.setState({ password: null })
  }

  async componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollections();
    // await this.props.getData('0xa1fe2d5ed0ac4e35be7b62a436a4dc4b4568f997dce06ed57e0f7fda900f8916');
  }

  render() {
    return (

      <div className="container">
        <h1>Listings I own</h1>
        <h5>Private Key</h5>
        <FormControl label="Password" type="password" onChange={this.onChange} />
        <Button disabled={!this.state.password} bsStyle="warning" onClick={this.decrypt}>Decrypt Data</Button>
        <ListGroup>
          <ListGroupItem>
            <div className="col-lg-12 col-xs-10 ">
              <LineChart data={this.props.collections}/>
            </div>
          </ListGroupItem>
        </ListGroup>
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

export default connect(mapState, {
  getCollections,
  getData,
  decrypt,
})(Collections);
