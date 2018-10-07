import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap'
import { getListings } from '../../containers/listings/actions';
import { FormControl } from 'react-bootstrap';
import Listing from './Listing'
import './styles.css'

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    if (!this.props.listingsLoaded && !this.props.listingsSuccess) {
      this.props.getListings();
    }
  }

  onChange({target: {value}}){
    this.setState({search: value})
  }

  render() {
    let listings = Object.keys(this.props.listings).map(id => this.props.listings[id]);
    if (this.state.search) {
      listings = listings.reduce((accum, ele) => {
        let keywordExists = false;
        const keywords = JSON.parse(ele.metadata).keywords
        if (Array.isArray(keywords)) {
          keywords.forEach(keyword => {
            if (keyword.includes(this.state.search)) keywordExists = true;
          })
        }

        if (keywordExists) accum.push(ele);
        return accum;
      }, [])
    }
    return (
      <div className="container">
        <h1>Listings</h1>
          <FormControl
            placeholder="Search"
            type="text"
            onChange={this.onChange}
            value={this.state.search}
            style={{ "marginBottom": '8px' }}
          />
          <ListGroup>
            {listings.map(({ datahash, metadata, owner }) =>
              <Listing
                key={datahash}
                dataHash={datahash}
                metadata={metadata}
                owner={owner}
                value='100000000000000' // 2 cents around
              />
            )}
          </ListGroup>
      </div>
    )
  }
}

const mapState = state => (
  {
    listings: state.listings.data,
    listingsLoaded: state.listings.listingsLoaded,
    listingsSuccess: state.listings.listingsSuccess,
  }
);

export default connect(mapState, { getListings })(Listings);
