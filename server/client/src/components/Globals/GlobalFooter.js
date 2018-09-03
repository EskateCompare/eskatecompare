import React, { Component } from 'react';
import { Container, List, Segment, Grid, Header, Icon } from 'semantic-ui-react';

class GlobalFooter extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Info</List.Item>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Blog</List.Item>
                    <List.Item as='a'>Terms and Conditions</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                   <Icon name='heart' size='mini'/> We Love Electric Boards! 
                  </Header>
                  <p>
                    We find and curate all of the best electric boards in the world!
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default GlobalFooter;


  