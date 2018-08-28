import React, { Component } from 'react';
import ListItem from './ListItem';
import { Button, Icon, Grid, Dropdown, Divider, Table } from 'semantic-ui-react';
import sortingOptions from '../constants'

export default class ProductList extends Component {
  constructor(){
    super();

    this.state = {
      sortIcon: 'sort amount up',
      filterText: 'Sort By',
    }

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSort(){
    const { sortIcon } = this.state;

    if (sortIcon === 'sort amount up') {
      this.setState({ sortIcon: 'sort amount down' });
    }
    if (sortIcon === 'sort amount down') {
      this.setState({ sortIcon: 'sort amount up' });
    }
  }

  handleFilter(e, value){
    this.setState({ filterText: value.text });
  }

  renderListItems(){
    const { products } = this.props.products;
 
    const listItems = products.map((product, index) =>
      <ListItem key={index} product={product} rank={index + 1}/>
    );

    return listItems;
  }

  renderDropdownItems() {
    const dropdownItems = sortingOptions.map((option, index) =>
      <Dropdown.Item key={index} onClick={this.handleFilter} text={option} />
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
            <Button icon={sortIcon} onClick={this.handleSort}/>
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
