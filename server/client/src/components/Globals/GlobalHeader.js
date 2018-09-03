import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

class GlobalHeader extends Component {
  render() {
    return (
      <div style={{marginBottom: '80px'}}>
        <Menu fixed='top' inverted stackable>
          <Container>
            <Link to="/">
              <Menu.Item as='a'>
                <img src='https://react.semantic-ui.com/logo.png' />
              </Menu.Item>
            </Link>
            <Menu.Item as='a'>
              <Link to='/compare'>Electric Boards</Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link to='/compare'>Electric Long Boards</Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link to='/compare'>Electric Penny Boards</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default GlobalHeader;
