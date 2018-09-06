import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu, Search } from 'semantic-ui-react';
import {
  onFilterChange,
  fetchProducts,
  onClearFilter,
} from '../../actions/CompareProducts';

import { fetchTextSearch } from '../../actions/Main';

const mapStateToProps = state => ({
  ...state.CompareProducts,
  ...state.Main
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
  fetchProducts: (payload) => dispatch(fetchProducts(payload)),
  onClearFilter: () => dispatch(onClearFilter()),
  fetchTextSearch: (payload) => dispatch(fetchTextSearch(payload)),
})

class GlobalHeader extends Component {
  constructor() {
    super()

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavClickAllProducts = this.handleNavClickAllProducts.bind(this);
    this.handleOnTextSearchChange = this.handleOnTextSearchChange.bind(this);
  }

  handleNavClick(event, data) {
    this.props.onClearFilter();
    this.props.onFilterChange({ style: data.name, checked: true });
    this.props.fetchProducts(this.props.filterState);
  }

  handleNavClickAllProducts(event, data) {
    this.props.onClearFilter();
    this.props.fetchProducts(this.props.filterState);
  }

  handleOnTextSearchChange(event, data) {
    this.props.fetchTextSearch(data.value)
  }

  render() {
    return (
      <div style={{marginBottom: '80px'}}>
        <Menu fixed='top' inverted stackable>
          <Container>
            <Link to="/">
              <Menu.Item link>
                <img src='https://react.semantic-ui.com/logo.png' alt=''/>
              </Menu.Item>
            </Link>
            <Menu.Item link onClick={this.handleNavClickAllProducts}>
              <Link to='/compare'>Electric Boards</Link>
            </Menu.Item>
            <Menu.Item link name='longboard' onClick={this.handleNavClick}>
              <Link to='/compare'>Electric Long Boards</Link>
            </Menu.Item>
            <Menu.Item link name='pennyboard' onClick={this.handleNavClick}>
              <Link to='/compare'>Electric Penny Boards</Link>
            </Menu.Item>
            <Menu.Item position='right'>
              <Search
                onSearchChange={this.handleOnTextSearchChange}
                loading={this.props.fetching}
                results={this.props.searchResults}
                placeholder='Search...'
              />
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
