import React from 'react';
import ImageList from './ImageList';
import DealList from './DealList';
import SpecList from './SpecList';
import ReviewList from './ReviewList';
import Rating from './Rating';
import { Dimmer, Header, Icon, Grid, Image, Divider, Label,  Loader, Segment } from 'semantic-ui-react';

export default class Product extends React.Component {
  componentDidMount() {
    const { fetchProduct, match, fetchImpressions } = this.props;

    fetchProduct(match.params.slug);
    fetchImpressions();
  }

  render() {
    const { product } = this.props.product;
    const { name, deals, reviews, brand, ratings, slug, impressions } = product;
    const { fetchPostRecommend, addUserRecommendation, user, fetchPostImpressions } = this.props;

    if (this.props.fetching) {
      return (
        <Segment style={{padding: '10em 0', border: 'none', margin: '64px 0'}} vertical size='massive'>
          <Dimmer inverted active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        </Segment>
      )
    }

    return (
      <div style={{padding: '80px 0'}}>
        <Grid container columns={2} stackable>
          <Grid.Column width={7}>
            <Header floated='left' as='h1'>
              <Image src={brand.logo} size='small' />
              {name}
            </Header>
          </Grid.Column>
          <Grid.Column floated='right' width={9}>
            <Header floated='right' as='h6'>
              <Rating ratings={ratings} size='large' />
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
              <ReviewList
                user={user}
                reviews={reviews}
                ratings={ratings}
                fetchPostRecommend={fetchPostRecommend}
                impressions={impressions}
                fetchPostImpressions={fetchPostImpressions}
                slug={slug}
                addUserRecommendation={addUserRecommendation}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
