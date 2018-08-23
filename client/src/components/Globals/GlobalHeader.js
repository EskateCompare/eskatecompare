import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Menu, Icon, Grid, Image, Button, Header, Segment } from 'semantic-ui-react';
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
      <div>
        <Link to="/">
          <Segment inverted>
            <Menu inverted secondary>
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
            </Menu>
          </Segment>
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
