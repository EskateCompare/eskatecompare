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
    const renderedListItems = this.renderListItems();
    const renderedDropdownItems = this.renderDropdownItems();

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
                {renderedDropdownItems}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
        <Table textAlign='center' basic='very' striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Icon name='trophy'/></Table.HeaderCell>
              <Table.HeaderCell><Icon name='image outline'/></Table.HeaderCell>
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
