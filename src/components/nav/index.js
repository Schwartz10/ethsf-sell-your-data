import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './styles.css';

const pages = {
  "1": '/listings',
  "2": '/collections'
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: window.location.pathname === '/collections'
        ? '2' : '1'
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(activeKey, event) {
    event.preventDefault();
    const activePage = pages[activeKey]
    this.props.history.push(activePage);
    this.setState({ activeKey });
  }

  render () {
    console.log(window.location.pathname)
    return (
      <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem className="nav-item" eventKey="1" title="Listings">
            Listings
          </NavItem>
        <NavItem className="nav-item" eventKey="2" title="Collections">
          Collections
        </NavItem>
      </Nav>
  );
  }
}

export default withRouter(NavBar);
