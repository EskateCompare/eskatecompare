import React, { Component } from 'react';
import ListItem from './ListItem';
import { Button, Icon, Grid, List, Dropdown, Divider } from 'semantic-ui-react';
import sortingOptions from '../constants'

class ProductList extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/products/`)
      .then(response => response.json())
      .then(json => this.setState({products: json.products}))
  }

  renderListItems(){
    const { products } = this.state;

    const listItems = products.map((product, index) =>
      <ListItem key={index} data={product}/>
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
    console.log(this.state.products);

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
        <Divider />
        <List divided relaxed>
          {this.renderedListItems}
        </List>
      </div>
    );
  }
}

export default ProductList;
