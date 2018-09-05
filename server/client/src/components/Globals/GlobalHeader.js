import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import {
  onFilterChange,
  fetchProducts,
  onClearFilter,
} from '../../actions/CompareProducts';

const mapStateToProps = state => ({
  ...state.CompareProducts
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
  fetchProducts: (payload) => dispatch(fetchProducts(payload)),
  onClearFilter: () => dispatch(onClearFilter()),
})

class GlobalHeader extends Component {
  constructor() {
    super()

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavClickAllProducts = this.handleNavClickAllProducts.bind(this);
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
          </Container>
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
