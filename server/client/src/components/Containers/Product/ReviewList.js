import React, { Component } from 'react';
import { Grid, Image, Header, Divider, Feed, List, Rating } from 'semantic-ui-react';

const image = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

export default class ReviewList extends Component {
  renderReviews() {
    const { reviews } = this.props;

    const renderReviews = reviews.map((review, index) => {
      const { name, rating, content} = review;

      return (            
        <Feed.Event key={index}>
          <Feed.Label image={image} />
          <Feed.Content>
            <Feed.Date content={name} />
            <Feed.Summary>
              <Rating icon='star' defaultRating={rating} maxRating={5} />
            </Feed.Summary>
            <Feed.Extra text content={content} />
          </Feed.Content>
        </Feed.Event>
        )
      }
    );

    return renderReviews;
  }

  render() {
    console.log(this.props.reviews, 'reviewlist');
    const renderedReviews = this.renderReviews();

    return (
      <div>
        <Header as='h3'>Reviews</Header>
          <Divider hidden/>
            <Feed>
            {renderedReviews}
            </Feed>
        </div>
    );
  }
}