import React, { Component } from 'react';
import { Container, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Item } from 'semantic-ui-react';

class ProductList extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: {}
    }

    this.renderedListItems = this.renderListItems.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/products/`)
      .then(response => response.json())
      .then(json => this.setState({products: json}))
  }

  renderListItems(){
    const { products } = this.state;

    const listItems = this.state.products.map((product) =>
      <li>{product.name}</li>
    );

    return listItems;
  }

  render() {
    this.renderedListItems = this.renderListItems();

    console.log(this.state, 'hello');

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
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
              <List.Description as='a'>Updated 22 mins ago</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
              <List.Description as='a'>Updated 34 mins ago</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default ProductList;
