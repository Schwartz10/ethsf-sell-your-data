import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrypt } from '../../containers/web3/actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import LineChart from './Chart';
import { FormControl, Button } from 'react-bootstrap';
import { getCollections } from '../../containers/collections/actions';

class Collections extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: null,
    }
    this.onChange = this.onChange.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }

  onChange({target: {value}}){
    this.setState({ password: value });
  }

  decrypt() {
    this.props.decrypt(this.props.collections, this.state.password);
    this.setState({ password: null })
  }

  async componentDidMount() {
    if (!this.props.collectionsLoaded) this.props.getCollections();
  }

  render() {
    return (
      <div className="container">
        <h1>Listings I own</h1>
        <h5>Private Key</h5>
        <FormControl label="Password" type="password" onChange={this.onChange} />
        <Button disabled={!this.state.password} bsStyle="warning" onClick={this.decrypt}>Decrypt Data</Button>
        {this.props.decryptedDataSet.length && this.props.decryptedDataSet.map((json, idx) => {
          return (
            <ListGroup key={idx}>
              <ListGroupItem>
                <div className="col-lg-12 col-xs-10 ">
                  <LineChart data={json}/>
                </div>
              </ListGroupItem>
            </ListGroup>
          )
        })}
      </div>
    )
  }
}

const mapState = state => (
  {
    collections: state.collections.data,
    decryptedDataSet: state.collections.decryptedDataSet,
    decryptedData: state.collections.decryptedData,
    collectionsLoading: state.collections.collectionsLoading,
    collectionsLoaded: state.collections.collectionsLoaded,
    collectionsSuccess: state.collections.collectionsSuccess,
  }
)

export default connect(mapState, {
  getCollections,
  decrypt,
})(Collections);
