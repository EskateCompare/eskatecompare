import React, { Component } from 'react';
import { Grid, Table, List, Image, Button, Divider, Icon, Label } from 'semantic-ui-react';

export default class DealList extends Component {
  renderDeals() {
    const { deals } = this.props;

    const renderDeals = deals.map((deal, index) => {
      const { originalPrice, salesPrice } = deal;
      return (
        <Table.Row key={index}>
          <Table.Cell verticalAlign='middle'><Image centered src='https://react.semantic-ui.com/images/wireframe/image.png' size='tiny' /></Table.Cell>
          <Table.Cell verticalAlign='middle'>${originalPrice}</Table.Cell>
          <Table.Cell verticalAlign='middle'><Label color='red' tag>${salesPrice}</Label></Table.Cell>
          <Table.Cell verticalAlign='middle'><Button primary>See Deal</Button></Table.Cell>
        </Table.Row>
        )
      }
    );
    return renderDeals;
  }

  render() {
    const renderedDeals = this.renderDeals();

    return (
      <Table textAlign='center' basic='very' striped selectable>
        <Table.Body>
          {renderedDeals}
        </Table.Body>
      </Table>
    );
  }
}

  