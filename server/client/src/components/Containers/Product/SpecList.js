import React, { Component } from 'react';
import { Grid, List, Label } from 'semantic-ui-react';

export default class SpecList extends Component {
  // renderSpec() {


  //   const renderSpec = sortingOptions.map((option, index) =>
  //     <List.Item>
  //       <Grid container columns={16} stackable>
  //         <Grid.Column width={8}>
  //           Range
  //         </Grid.Column>
  //         <Grid.Column width={8}>
  //           Up to 14 miles
  //         </Grid.Column>
  //       </Grid>
  //     </List.Item>
  //   );

  //   return renderSpec;
  // }

  render() {
    return (
      <List relaxed='very' verticalAlign='middle'>
          <List.Item>
            <List.Content floated='right'>
              <Label>24 miles</Label>
            </List.Content>
            <List.Icon name='map marker alternate' size='large'/>
            <List.Content>Range</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated='right'>
              <Label>35 km/h</Label>
            </List.Content>
            <List.Icon name='angle double right' size='large'/>
            <List.Content>Speed</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated='right'>
              <Label>Penny Board</Label>
            </List.Content>
            <List.Icon name='adjust' size='large'/>
            <List.Content>Board Type</List.Content>
          </List.Item>
      </List>
    );
  }
}