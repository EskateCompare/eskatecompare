import React, { Component } from 'react';
import ListItem from './ListItem';
import { Button, Icon, Grid, List, Dropdown, Divider } from 'semantic-ui-react';

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
    console.log(products);
    const listItems = products.map((product, index) =>
      <ListItem key={index} data={product}/>
    );

    return listItems;
  }

  render() {
    this.renderedListItems = this.renderListItems();

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
                <Dropdown.Item icon='attention' text='Important' />
                <Dropdown.Item icon='comment' text='Announcement' />
                <Dropdown.Item icon='conversation' text='Discussion' />
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
