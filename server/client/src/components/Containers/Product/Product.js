import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import DealList from './DealList';
import SpecList from './SpecList';
import ReviewList from './ReviewList';
import fetch from 'cross-fetch';
import { Container, Menu, Feed, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Label, Rating } from 'semantic-ui-react';

export default class Product extends React.Component {
  componentDidMount() {
    const { fetchProduct, match } = this.props;
    fetchProduct(match.params.slug);
  }

  render() {
    const { product } = this.props;
    const { name, deals, reviews } = product;

    return (
      <div className="App">
        <Grid container columns={2} stackable>
          <Grid.Column width={7}>
            <Header floated='left' as='h1'>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
              {name}
            </Header>
          </Grid.Column>
          <Grid.Column floated='right' width={9}>
            <Header floated='right' as='h6'>
              <Rating icon='star' defaultRating={4} maxRating={5} />
              <Label color='green'>      
                99
              </Label>
              <Label>
                <Icon name='checkmark' />
                Last Updated
                <Label.Detail>August 2018</Label.Detail>
              </Label>
            </Header>
          </Grid.Column>
        </Grid>

        <Grid container columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={8}> 
              <ImageList images={product}/>
              </Grid.Column>
            <Grid.Column width={8}>
              <DealList deals={deals}/>
            </Grid.Column>
          </Grid.Row>

          <Divider />
          
          <Grid.Row divided>
            <Grid.Column width={5}>
              <SpecList specs={product}/>
            </Grid.Column>
            <Grid.Column width={11}>
              <ReviewList reviews={reviews}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}




