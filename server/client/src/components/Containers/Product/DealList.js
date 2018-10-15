import React, { Component } from 'react';
import { Table, Image, Button, Label } from 'semantic-ui-react';

export default class DealList extends Component {
  renderDeals() {
    const { deals } = this.props;

    const renderDeals = deals.map((deal, index) => {
      const { originalPrice, salesPrice, url, store } = deal;
      return (
        <Table.Row key={index}>
          <Table.Cell verticalAlign='middle'><Image centered src={store.logo} size='tiny' /></Table.Cell>
          <Table.Cell verticalAlign='middle'>${originalPrice}</Table.Cell>
          <Table.Cell verticalAlign='middle'><Label color='red' tag>${salesPrice}</Label></Table.Cell>
          <Table.Cell verticalAlign='middle'><a href={url} target="_blank"><Button primary>See Deal</Button></a></Table.Cell>
        </Table.Row>
        )
      }
    );
    return renderDeals;
  }

  render() {
    const renderedDeals = this.renderDeals();

    return (
      <Table textAlign='center' basic='very' striped>
        <Table.Body>
          {renderedDeals}
        </Table.Body>
      </Table>
    );
  }
}
