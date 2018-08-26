import React, { Component } from 'react';
import { Grid, List, Image, Button, Divider } from 'semantic-ui-react';

export default class DealList extends Component {
  renderDeals() {
    const { deals } = this.props;

    const renderDeals = deals.map((deal, index) => {
      const { originalPrice, salesPrice } = deal;
      return (
        <div key={index}>
          <List.Item>
            <Grid container columns={16} stackable>
              <Grid.Column width={4}>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='tiny' />
              </Grid.Column>
              <Grid.Column width={4}>
                {originalPrice}
              </Grid.Column>
              <Grid.Column width={4}>
                {salesPrice}
              </Grid.Column>
              <Grid.Column width={4}>
                <Button>Buy</Button>
              </Grid.Column>
            </Grid>
          </List.Item>
          <Divider />
        </div>
        )
      }
    );
    return renderDeals;
  }

  render() {
    const renderedDeals = this.renderDeals();

    return (
        <List divided relaxed>
          {renderedDeals}
        </List>
    );
  }
}

