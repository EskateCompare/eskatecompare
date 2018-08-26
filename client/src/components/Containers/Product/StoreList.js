import React, { Component } from 'react';
import { Grid, List, Image, Button, Divider } from 'semantic-ui-react';

export default class StoreList extends Component {
  render() {
    return (
        <List divided relaxed>
          <List.Item>
            <Grid container columns={16} stackable>
              <Grid.Column width={4}>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='tiny' />
              </Grid.Column>
              <Grid.Column width={4}>
                Name
              </Grid.Column>
              <Grid.Column width={4}>
                $1599
              </Grid.Column>
              <Grid.Column width={4}>
                <Button>Buy</Button>
              </Grid.Column>
            </Grid>
          </List.Item>
          <Divider />
        </List>
    );
  }
}