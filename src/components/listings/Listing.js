import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export default class Listing extends Component {
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
            <Button bsStyle="primary">Buy for</Button> {/* add price here */}
          </ListGroupItem>
        </div>
      </div>
    );
  }
}