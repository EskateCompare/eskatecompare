import React from 'react';
import agent from '../../../agent';
import { connect } from 'react-redux';

import { Container, Menu, Feed, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Label, Rating } from 'semantic-ui-react';

const mapStateToProps = state => ({
  ...state.main
})

const mapDispatchToProps = dispatch => ({
  onLoad: function(payload) {
    dispatch({ type: 'RETRIEVE_SINGLE_PRODUCT', payload})
  }
})

const image = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const date = '3 days ago by Michael Valentine'
const summary = 'Laura Faucet created a post'
const extraText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class Product extends React.Component {

  componentDidMount() {
    this.props.onLoad(agent.Eboards.single('mellow-board'))
  }

  render() {
    return (
      <div className="App">
        <Grid container columns={2} stackable>
          <Grid.Column width={7}>
            <Header floated='left' as='h1'>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
              Boosted Board
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
          <Grid.Column width={8}>
          <Grid columns={2}>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <List divided relaxed>
              <List.Item>
                <Grid container columns={16} stackable>
                  <Grid.Column width={4}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='tiny' />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    Name
                  </Grid.Column>
                  <Grid.Column width={4}>
                    $1599
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button>Buy</Button>
                  </Grid.Column>
                </Grid>
              </List.Item>
              <Divider />
            </List>
          </Grid.Column>
        </Grid>

        <Grid container columns={2} stackable>
          <Grid.Column width={4}>
          <List divided relaxed>
              <List.Item>
                <Grid container columns={16} stackable>
                  <Grid.Column width={8}>
                    Range
                  </Grid.Column>
                  <Grid.Column width={8}>
                    Up to 14 miles
                  </Grid.Column>
                </Grid>
              </List.Item>
              <List.Item>
                <Grid container columns={16} stackable>
                  <Grid.Column width={8}>
                    Range
                  </Grid.Column>
                  <Grid.Column width={8}>
                    Up to 14 miles
                  </Grid.Column>
                </Grid>
              </List.Item>
              <List.Item>
                <Grid container columns={16} stackable>
                  <Grid.Column width={8}>
                    Range
                  </Grid.Column>
                  <Grid.Column width={8}>
                    Up to 14 miles
                  </Grid.Column>
                </Grid>
              </List.Item>
            </List> 
          </Grid.Column>
          <Grid.Column width={1}><Divider vertical/> </Grid.Column>
          <Grid.Column width={11}>
            <Header as='h3'>Reviews</Header>
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
          </Grid.Column>
        </Grid>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
