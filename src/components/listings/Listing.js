import React, { Component } from 'react';
import { ListGroupItem, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { buyData } from '../../containers/web3/actions';
import styled, { css } from 'styled-components';
import AnimatedNumber from 'react-animated-number';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.buyData = this.buyData.bind(this);
  }

  buyData(e) {
    e.preventDefault()
    this.props.buyData(this.props.dataHash, this.props.ethereumAddress, this.props.owner, this.props.value);
  }

  render() {
    const { metadata } = this.props;
    const { gender, age } = JSON.parse(metadata);
    const [keyword1, keyword2, keyword3, keyword4, keyword5] = JSON.parse(metadata).keywords;
    const Button = styled.button`
      border-radius: 5px;
      padding: 0.25em 1em;
      margin: 0 1em;
      background: transparent;
      color: #dfcfdc;
      border: 2px solid #dfcfdc;

      ${props => props.primary && css`
        background: #dfcfdc;
        color: white;
      `}
    `;

    return (
      <div>
        <ListGroupItem>
          <div>
            <Col s={6}>
              <div style={{display: 'flex', 'flexDirection': 'row'}}>
                <div style={{ marginRight: '8px' }}>
                  <h5 style={{color: '#265a88'}}>Age</h5>
                  <p>{ age || 'N/A'}</p>
                </div>
                <div>
                  <h5 style={{color: '#265a88'}}>Gender</h5>
                  <p>{(gender && gender.toUpperCase()) || 'N/A'}</p>
                </div>
              </div>
              <h5 style={{color: '#265a88'}}>Keywords</h5>
              <p>
                {`${keyword1}, `}
                {`${keyword2}, `}
                {`${keyword3}, `}
                {`${keyword4}, `}
                {`${keyword5}`}
              </p>
            </Col>
          </div>
          <div>
            <Button
              style={{ 'height': '40px' }}
              onClick={this.buyData}
              bsStyle="primary"
            >
              Buy
            </Button>
            <p style={{'font-size': '20px', padding:'20px', color: 'silver', 'textAlign': 'center'}}>$0.02</p>
          </div>
          </ListGroupItem>
      </div>
    );
  }
}

const mapState = state => (
  {
    ethereumAddress: state.web3.ethereumAddress
  }
)

export default connect(mapState, {buyData})(Listing);
