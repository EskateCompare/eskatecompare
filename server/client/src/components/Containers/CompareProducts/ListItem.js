import React, { Component } from 'react';
import { Image, Label, Table, Icon, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Rating from '../Product/Rating';

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
    const { image, specs,  ratings, name, bestPrice, thumbnail } = product;
    const {  speed, range } = specs;
    let color = undefined;

    if (ratings.compositeScore >= 90) { color = 'green' }
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
        <Table.Cell verticalAlign='middle'><Image centered src={thumbnail != undefined ? thumbnail.source : image.source} size='mini' /></Table.Cell>
        <Table.Cell verticalAlign='middle'>{name}</Table.Cell>
        <Table.Cell verticalAlign='middle'>{speed} mph</Table.Cell>
        <Table.Cell verticalAlign='middle'>{range} m</Table.Cell>
        <Table.Cell verticalAlign='middle'>{bestPrice != null ? '$' + bestPrice : "-"}</Table.Cell>
        <Table.Cell verticalAlign='middle'>

        <Rating ratings={ratings} size='large' />
        </Table.Cell>
      </Table.Row>
    )
  }
}
