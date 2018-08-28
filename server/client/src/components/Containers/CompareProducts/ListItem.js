import React, { Component } from 'react';
import { Icon, Grid, List, Image, Label, Table } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class ListItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      link: false,
    }

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(e, value) {
    this.setState({ link: true });

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

    if (this.state.link) {
      return <Redirect push to={`/product/${this.props.product.slug}`} />;
    }

    return (
      <Table.Row onClick={this.handleRowClick}>
        <Table.Cell verticalAlign='middle'>#{rank}</Table.Cell>
        <Table.Cell verticalAlign='middle'><Image centered src={image} size='mini' /></Table.Cell>
        <Table.Cell verticalAlign='middle'>{name}</Table.Cell>
        <Table.Cell verticalAlign='middle'>{speed}</Table.Cell>
        <Table.Cell verticalAlign='middle'>{range}</Table.Cell>
        <Table.Cell verticalAlign='middle'>${msrp}</Table.Cell>
        <Table.Cell verticalAlign='middle'>
          <Label color={color}>
            {ratings.compositeScore}%
          </Label>
        </Table.Cell>
      </Table.Row>
    )
  }
}
