import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

class GlobalHeader extends Component {
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
            <Menu.Item link>
              <Link to='/compare'>Electric Boards</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to='/compare'>Electric Long Boards</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to='/compare'>Electric Penny Boards</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default GlobalHeader;
