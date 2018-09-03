import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state.main});

const mapDispatchToProps = function(dispatch) {

}

class GlobalHeader extends Component {
  constructor() {
    super()

    this.state = {
      activeItem: 'home',
      link: false,
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick() {
    this.setState({ link: true });
  }

  render() {
    const { activeItem, link } = this.state;

    if (link) {
      return <Redirect exact push to={`/compare`} />;
    }

    return (
      <div style={{marginBottom: '80px'}}>
        <Menu fixed='top' inverted stackable>
          <Container>
            <Link to="/">
              <Menu.Item>
                <img src='https://react.semantic-ui.com/logo.png' />
              </Menu.Item>
            </Link>
            <Menu.Item 
              name='Electric Boards'
              active={this.state.activeItem === 'Electric Boards'}
              onClick={this.handleItemClick} 
            />
            <Menu.Item
              name='Electric Longboards'
              active={this.state.activeItem === 'Electric Longboards'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Electric Pennyboards'
              active={this.state.activeItem === 'Electric Pennyboards'}
              onClick={this.handleItemClick}
            />
          </Container>
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
