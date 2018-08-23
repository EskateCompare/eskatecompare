import React, { Component } from 'react';
import ProductList from './ProductList';

import { Container, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Label } from 'semantic-ui-react';

class ProductPage extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">
        <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
      <Container>
        <Grid>
          <Grid.Row>
            <Header floated='left' as='h1'>656 best running shoes (364 in US 9½)</Header>
          </Grid.Row>
          <Grid.Row>
            <Header floated='left' as='h5'>
              <Icon name='checkmark' />
              <Header.Content>Updated August 2018</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Header floated='left'as='h5'>
              <Icon name='checkmark' />
              <Header.Content>Based on 54,683 reviews</Header.Content>
            </Header>
          </Grid.Row>
        </Grid>
      </Container>

      <Grid container columns={2} stackable>
        <Grid.Column width={4}>
          <Label>
            Inboard
          </Label>
          <Label>
            BoostedBoard
          </Label>

        </Grid.Column>
        <Grid.Column width={12}>

        <ProductList />
        

        </Grid.Column>
      </Grid>

      </div>
    );
  }
}

export default ProductPage;
