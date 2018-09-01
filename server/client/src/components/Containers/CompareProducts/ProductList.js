import React, { Component } from 'react';
import ListItem from './ListItem';
import { Button, Icon, Grid, Dropdown, Divider, Table, Loader, Dimmer } from 'semantic-ui-react';
import sortingOptions from '../constants'

export default class ProductList extends Component {
  constructor(){
    super();

    this.state = {
      sortIcon: 'sort amount down',
      filterText: 'Sort By',
    }

    this.handleSortDirection = this.handleSortDirection.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  handleSortDirection(e, target) {
    const { fetchProducts, onSortDirection, filterState, fetching } = this.props;
    const { sortIcon } = this.state;

    if (sortIcon === 'sort amount up') {
      this.setState({ sortIcon: 'sort amount down' });
      onSortDirection({ sortDir: 'dsc' })
    }
    if (sortIcon === 'sort amount down') {
      this.setState({ sortIcon: 'sort amount up' });
      onSortDirection({ sortDir: 'asc' })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetchProducts, filterState, fetching } = this.props;

    if (prevProps.filterState !== this.props.filterState ) {
      fetchProducts(filterState);
    } 
  }

  handleSortBy(e, value) {
    const { fetchProducts, onSortBy, filterState } = this.props;

    this.setState({ filterText: value.text });
    onSortBy({ sortBy: value.text })
  }

  renderListItems() {
    const { products } = this.props.products;
 
    const listItems = products.map((product, index) =>
      <ListItem key={index} product={product} rank={index + 1}/>
    );

    return listItems;
  }

  renderDropdownItems() {
    const dropdownItems = sortingOptions.map((option, index) =>
      <Dropdown.Item key={index} onClick={this.handleSortBy} text={option} />
    );

    return dropdownItems;
  }

  render() {
    const { sortIcon, filterText } = this.state;
    const renderedListItems = this.renderListItems();
    const renderedDropdownItems = this.renderDropdownItems();

    return (
      <div>
        <Grid>
          <Grid.Column floated='left' width={2}>
            <Button icon={sortIcon} onClick={this.handleSortDirection}/>
          </Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Dropdown text={filterText} icon='sort' floating labeled button className='icon'>
              <Dropdown.Menu>
                {renderedDropdownItems}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Table textAlign='center' basic='very' striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Icon name='trophy'/></Table.HeaderCell>
              <Table.HeaderCell><Icon name='image'/></Table.HeaderCell>
              <Table.HeaderCell textAlign='center' verticalAlign='middle'>Board</Table.HeaderCell>
              <Table.HeaderCell>Max Speed</Table.HeaderCell>
              <Table.HeaderCell>Range</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {renderedListItems}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
