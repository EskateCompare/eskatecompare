import React, { Component } from 'react';
import ListItem from './ListItem';
import { Button, Icon, Grid, Dropdown, Divider, Table } from 'semantic-ui-react';
import sortingOptions from '../constants'

export default class ProductList extends Component {
  renderListItems(){
    const { products } = this.props.products;
 
    const listItems = products.map((product, index) =>
      <ListItem key={index} product={product} rank={index + 1}/>
    );

    return listItems;
  }

  renderDropdownItems() {
    const dropdownItems = sortingOptions.map((option, index) =>
      <Dropdown.Item key={index} text={option} />
    );

    return dropdownItems;
  }

  render() {
    this.renderedListItems = this.renderListItems();
    this.renderedDropdownItems = this.renderDropdownItems();

    return (
      <div>
        <Grid>
          <Grid.Column floated='left' width={2}>
            <Button icon>
              <Icon name='sort amount up' />
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Dropdown text='Sort By' icon='sort' floating labeled button className='icon'>
              <Dropdown.Menu>
                {this.renderedDropdownItems}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Table basic='very' striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Board</Table.HeaderCell>
              <Table.HeaderCell>Max Speed</Table.HeaderCell>
              <Table.HeaderCell>Range</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderedListItems}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
