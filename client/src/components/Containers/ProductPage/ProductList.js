import React, { Component } from 'react';
import { Container, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Item } from 'semantic-ui-react';

class ProductList extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column floated='left' width={2}>
            <Grid>
              <Grid.Column floated='left' width={1}>
                 <Button icon>
                  <Icon name='grid layout' />
                </Button>
              </Grid.Column>
              <Grid.Column floated='left' width={1}>
                 <Button icon>
                  <Icon name='list layout' />
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column floated='right' width={3}>
            <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Header icon='tags' content='Filter by tag' />
                <Dropdown.Divider />
                <Dropdown.Item icon='attention' text='Important' />
                <Dropdown.Item icon='comment' text='Announcement' />
                <Dropdown.Item icon='conversation' text='Discussion' />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>

        <Divider />

        <List divided relaxed>
          <List.Item>
            <Grid container columns={16} stackable>
              <Grid.Column width={2}>
                #1
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='favorite' />
              </Grid.Column>
              <Grid.Column width={6}>
                Boosted Board
              </Grid.Column>
              <Grid.Column width={2}>
              <Icon name='favorite' />
              </Grid.Column>
              <Grid.Column width={2}>
              <Icon name='favorite' />
              </Grid.Column>
              <Grid.Column width={2}>
              8 reviews
              </Grid.Column>
            </Grid>
          </List.Item>
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
