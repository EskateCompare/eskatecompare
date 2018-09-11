import React, { Component } from 'react';
import ProductList from './ProductList';
import Filter from './Filter';
import { Header, Icon, Grid, Label } from 'semantic-ui-react';

export default class CompareProducts extends Component {
  componentDidMount() {
    const { fetchFilter, fetchProducts, filterState } = this.props;

    fetchProducts(filterState);
    fetchFilter(filterState);
  }

  render() {
    const { internalReviewsCount, externalReviewsCount, lastUpdated, totalMatching, totalProducts} = this.props.filter.stats;
    const { products, filterState, onSortBy, onSortDirection, onFilterChange, fetchProducts, fetchFilter, fetching } = this.props;
    const { filterOptions: filter } = this.props.filter.stats;

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
                {lastUpdated}
                <Label.Detail>Last Updated</Label.Detail>
              </Label>
            </Header>
          </Grid.Column>
        </Grid>
        <Grid container columns={2} stackable>
          <Grid.Column width={4}>
            <Filter filter={filter} fetchProducts={fetchProducts} onFilterChange={onFilterChange} filterState={filterState} fetchFilter={fetchFilter}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <ProductList fetching={fetching} products={products} fetchProducts={fetchProducts} onSortBy={onSortBy} onSortDirection={onSortDirection} filterState={filterState}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
