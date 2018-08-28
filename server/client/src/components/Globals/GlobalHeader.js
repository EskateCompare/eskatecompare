import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state.main});

const mapDispatchToProps = function(dispatch) {

}

class GlobalHeader extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div style={{marginBottom: '80px'}}>
          <Menu fixed='top' inverted>
            <Container>
              <Link to="/">
                <Menu.Item>
                  <img src='https://react.semantic-ui.com/logo.png' />
                </Menu.Item>
              </Link>
              <Menu.Item position='right' name='Electric Boards' active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Item
                name='Electric Longboards'
                active={activeItem === 'messages'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Electric Pennyboards'
                active={activeItem === 'friends'}
                onClick={this.handleItemClick}
              />
            </Container>
          </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
