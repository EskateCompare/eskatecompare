import React, { Component } from 'react';
import ProductList from './ProductList';
import Filter from './Filter';
import fetch from 'cross-fetch';

import { Container, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Label } from 'semantic-ui-react';

class CompareProducts extends Component {
  constructor(props){
    super(props)

    this.state = { 
      activeItem: 'home',
      stats: {},
    }
  }
  
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { activeItem, stats } = this.state;
    const { internalReviewsCount, externalReviewsCount, lastUpdated, totalMatching, totalProducts} = stats;

    return (
      <div className="App">
        <Grid container columns={2} stackable>
          <Grid.Column width={7}>
            <Header floated='left' as='h1'>{totalMatching} best electric boards of {totalProducts}</Header>
          </Grid.Column>
          <Grid.Column floated='right' width={9}>
            <Header floated='right' as='h6'>
              <Label>
                <Icon name='user circle' />
                {internalReviewsCount}
                <Label.Detail>User Reviews</Label.Detail>
              </Label>
              <Label>
                <Icon name='external' />
                {externalReviewsCount}
                <Label.Detail>External Reviews</Label.Detail>
              </Label>
              <Label>
                <Icon name='checkmark' />
                Last Updated
                <Label.Detail>{lastUpdated}</Label.Detail>
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
