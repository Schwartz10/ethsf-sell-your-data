import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { buyData } from '../../containers/web3/actions';

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
    const [keyword1, keyword2, keyword3, keyword4, keyword5] = JSON.parse(metadata).keywords;
    return (
      <div>
        <div>
          <ListGroupItem>
            <div className="col-lg-8 col-xs-6">
              {keyword1}
              {keyword2}
              {keyword3}
              {keyword4}
              {keyword5}
            </div>
            <Button onClick={this.buyData} bsStyle="primary">Buy for</Button> {/* add price here */}
          </ListGroupItem>
        </div>
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
