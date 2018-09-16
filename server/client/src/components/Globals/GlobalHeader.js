import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu, Search } from 'semantic-ui-react';
import {
  onFilterChange,
  fetchProducts,
  onClearFilter,
  fetchFilter,
} from '../../actions/CompareProducts';

import _ from 'lodash';

import { fetchTextSearch, redirectToSelectedProduct } from '../../actions/Main';

const mapStateToProps = state => ({
  ...state.CompareProducts,
  ...state.Main
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
  fetchProducts: (payload) => dispatch(fetchProducts(payload)),
  fetchFilter: (payload) => dispatch(fetchFilter(payload)),
  onClearFilter: () => dispatch(onClearFilter()),
  fetchTextSearch: (payload) => dispatch(fetchTextSearch(payload)),
  redirectToProduct: (payload) => dispatch(redirectToSelectedProduct(payload))
})

class GlobalHeader extends Component {
  constructor() {
    super()

    this.state = { link: false };
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavClickAllProducts = this.handleNavClickAllProducts.bind(this);
    this.handleOnTextSearchChange = this.handleOnTextSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  handleNavClick(event, data) {
    this.props.onClearFilter();
    this.props.onFilterChange({ style: data.name, checked: true });
  }

  handleNavClickAllProducts(event, data) {
    this.props.onClearFilter();
  }

  handleOnTextSearchChange(event, data) {
    this.props.fetchTextSearch(data.value)
  }

  handleResultSelect(event, data) {
    this.props.redirectToProduct(`/product/${data.result.slug}/`);
  }

  render() {
    return (
      <div style={{marginBottom: '64px'}}>
        <Menu fixed='top' inverted stackable>
          <Container>
            <Menu.Item as={NavLink} name='home' to='/'>
              <img src='https://react.semantic-ui.com/logo.png' alt=''/>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/compare/top-electric-skateboards' name='skateboard' onClick={this.handleNavClickAllProducts}>
              Electric Boards
            </Menu.Item>
            <Menu.Item as={NavLink} to='/compare/top-electric-longboards' name='longboard' onClick={this.handleNavClick}>
              Electric Long Boards
            </Menu.Item>
            <Menu.Item as={NavLink} to='/compare/top-electric-pennyboards' name='pennyboard' onClick={this.handleNavClick}>
              Electric Penny Boards
            </Menu.Item>
            <Menu.Item position='right'>
              <Search
                onSearchChange={_.debounce(this.handleOnTextSearchChange, 250, { leading: false })}
                onResultSelect={this.handleResultSelect}
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
