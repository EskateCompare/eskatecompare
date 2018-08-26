import React, { Component } from 'react';
import { Grid, Image, Header, Divider, Feed, List, Rating } from 'semantic-ui-react';

const image = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const date = '3 days ago by Michael Valentine'
const summary = 'Laura Faucet created a post'
const extraText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default class ReviewList extends Component {
  render() {
    return (
      <div>
        <Header as='h3'>Reviews</Header>
          <Divider hidden/>
          <List divided relaxed>
            <List.Item>
              <Grid container columns={16} stackable>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image={image} />
                    <Feed.Content>
                      <Feed.Date content={date} />
                      <Feed.Summary>
                        <Rating icon='star' defaultRating={4} maxRating={5} />
                      </Feed.Summary>
                      <Feed.Extra text content={extraText} />
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Grid>
            </List.Item>
            <Divider />
          </List>
        </div>
    );
  }
}