import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrypt } from '../../containers/web3/actions';
import { FormControl, Button } from 'react-bootstrap';
import ChartTile from './ChartTile';
import { getCollections } from '../../containers/collections/actions';
import styled, { css } from 'styled-components';
import AnimatedNumber from 'react-animated-number';

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
    const Button = styled.button`
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      background: transparent;
      color: #dfcfdc;
      border: 2px solid #dfcfdc;

      ${props => props.primary && css`
        background: #dfcfdc;
        color: white;
      `}
    `;

    return (
      <div className="container">
        {
          this.props.collectionsSuccess
            ? <React.Fragment>
              <h1>Listings I own</h1>
              <h5>Private Key</h5>
              <FormControl label="Password" type="password" onChange={this.onChange} />
              <Button bsStyle="warning" onClick={this.decrypt}>Decrypt Data</Button>
              {this.props.collections.map((collection, idx) => {
                return (<ChartTile collection={collection} data={this.props.decryptedDataSet[idx]} key={idx} />)
              })}
            </React.Fragment>
            : <div>Loading</div>
        }
      </div>
    )
  }
}

const mapState = state => (
  {
    collections: state.collections.data || [],
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
