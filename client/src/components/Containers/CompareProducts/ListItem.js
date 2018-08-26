import React, { Component } from 'react';
import { Icon, Grid, List, Image, Label, Table } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

export default class ListItem extends Component {
  constructor(props){
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    alert(this.props.product.name);
    return <Redirect to='/product' />
  }
  
  render() {
    const { rank, product } = this.props;
    const { image, name, speed, range, msrp, ratings } = product;
    let color = '';

    if (ratings.compositeScore > 90) { color = 'green' } 
    if (ratings.compositeScore >= 80 && ratings.compositeScore <= 89) { color = 'olive' }
    if (ratings.compositeScore >= 70 && ratings.compositeScore <= 79) { color = 'yellow' }
    if (ratings.compositeScore >= 60 && ratings.compositeScore <= 69) { color = 'orange' }
    if (ratings.compositeScore < 60) { color = 'red' }

    return (
      <Table.Row onClick={this.handleRowClick}>
        <Table.Cell>#{rank}</Table.Cell>
        <Table.Cell><Image src={image} size='mini' /></Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{speed}</Table.Cell>
        <Table.Cell>{range}</Table.Cell>
        <Table.Cell>${msrp}</Table.Cell>
        <Table.Cell>
          <Label color={color}>
            {ratings.compositeScore}%
          </Label>
        </Table.Cell>
      </Table.Row>
    )
  }
}
