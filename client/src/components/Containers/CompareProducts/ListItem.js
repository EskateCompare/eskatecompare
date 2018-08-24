import React, { Component } from 'react';
import { Icon, Grid, List, Image, Label } from 'semantic-ui-react';

const ListItem = (data) => {
  const { data: item } = data;

  return (
    <List.Item>
      <Grid container columns={16} stackable>
        <Grid.Column width={1}>
          #1
        </Grid.Column>
        <Grid.Column width={2}>
          <Image src={item.image} size='mini' />
        </Grid.Column>
        <Grid.Column width={5}>
          {item.name}
        </Grid.Column>
        <Grid.Column width={2}>
          {item.speed}
        </Grid.Column>
        <Grid.Column width={2}>
          {item.range}
        </Grid.Column>
        <Grid.Column width={2}>
          ${item.msrp}
        </Grid.Column>
        <Grid.Column width={2}>
          <Label color='green'>
            {item.ratings.compositeScore}%
          </Label>
        </Grid.Column>
      </Grid>
    </List.Item>
  )
}

export default ListItem;