import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';

export default class SpecList extends Component {
  render() {
    return (
			<List divided relaxed>
        <List.Item>
          <Grid container columns={16} stackable>
            <Grid.Column width={8}>
              Range
            </Grid.Column>
            <Grid.Column width={8}>
              Up to 14 miles
            </Grid.Column>
          </Grid>
        </List.Item>
        <List.Item>
          <Grid container columns={16} stackable>
            <Grid.Column width={8}>
              Range
            </Grid.Column>
            <Grid.Column width={8}>
              Up to 14 miles
            </Grid.Column>
          </Grid>
        </List.Item>
        <List.Item>
          <Grid container columns={16} stackable>
            <Grid.Column width={8}>
              Range
            </Grid.Column>
            <Grid.Column width={8}>
              Up to 14 miles
            </Grid.Column>
          </Grid>
        </List.Item>
      </List> 
    );
  }
}