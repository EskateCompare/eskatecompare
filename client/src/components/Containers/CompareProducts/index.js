import React, { Component } from 'react';
import ProductList from './ProductList';
import Filter from './Filter';

import { Container, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Label } from 'semantic-ui-react';

class CompareProducts extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">
        <Grid container columns={2} stackable>
          <Grid.Column width={7}>
            <Header floated='left' as='h1'>656 best electic boards of 1232</Header>
          </Grid.Column>
          <Grid.Column floated='right' width={9}>
            <Header floated='right' as='h6'>
              <Label>
                <Icon name='user' />
                223
                <Label.Detail>User Reviews</Label.Detail>
              </Label>
              <Label>
                <Icon name='external' />
                1567
                <Label.Detail>External Reviews</Label.Detail>
              </Label>
              <Label>
                <Icon name='checkmark' />
                Last Updated
                <Label.Detail>August 2018</Label.Detail>
              </Label>
            </Header>
          </Grid.Column>
        </Grid>
        <Grid container columns={2} stackable>
          <Grid.Column width={4}>
            <Filter />
          </Grid.Column>
          <Grid.Column width={12}>
            <ProductList />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default CompareProducts;
