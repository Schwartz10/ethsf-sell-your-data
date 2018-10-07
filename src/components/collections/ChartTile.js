import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';
import LineChart from './Chart';

export default class ChartTile extends Component {
  render() {
    const { age, gender } = this.props.collection.metadata;
    const [keyword1, keyword2, keyword3, keyword4, keyword5] = this.props.collection.metadata.keywords;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            <Col s={6}>
              <div style={{display: 'flex', 'flexDirection': 'row', 'justifyContent': 'space-evenly'}}>
                  <div style={{ marginRight: '8px' }}>
                    <h5 style={{color: '#265a88'}}>Age</h5>
                    <p>{ age || 'N/A'}</p>
                  </div>
                  <div style={{ marginRight: '8px' }}>
                    <h5 style={{color: '#265a88'}}>Gender</h5>
                    <p>{(gender && gender.toUpperCase()) || 'N/A'}</p>
                  </div>
                <div>
                  <h5 style={{color: '#265a88'}}>Keywords</h5>
                  <p>
                    {`${keyword1}, `}
                    {`${keyword2}, `}
                    {`${keyword3}, `}<br />
                    {`${keyword4}, `}
                    {`${keyword5}`}
                  </p>
                </div>
              </div>
            </Col>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            {this.props.data
              ? <LineChart data={this.props.data} />
              : <div>Make sure to decrypt your data!</div>}
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

