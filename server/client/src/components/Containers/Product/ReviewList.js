import React, { Component } from 'react';
import { Header, Feed, Rating, Divider, Form, Button, Segment, Input, Comment } from 'semantic-ui-react';

const image = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

export default class ReviewList extends Component {
  constructor() {
    super()

    this.state = {
      recommend: ''
    }

    this.handleRecommend = this.handleRecommend.bind(this);
  }

  // componentDidUpdate() {
    
  // }

  handleRecommend(event, target) {
    const { recommend } = this.state;
    const { fetchPostRecommend, slug } = this.props;
   
    this.setState({ recommend: target.value })
    // alert(target.value);
    const requestObject = {
      product: slug,
      recommendChange: {
        yes: (target.value === 'yes') ? 1 : 0,
        maybe: (target.value === 'maybe') ? 1 : 0,
        no: (target.value === 'no') ? 1 : 0,
      }
    }

    fetchPostRecommend(requestObject);
  }

  renderReviews() {
    const { reviews } = this.props;

    const renderReviews = reviews.map((review, index) => {
      const { name, rating, content} = review;

      return (            
        <Feed.Event key={index}>
          <Feed.Label image={image} />
          <Feed.Content>
            <Feed.Date content={name} />
            <Feed.Extra text content={content} />
          </Feed.Content>
        </Feed.Event>
        )
      }
    );

    return renderReviews;
  }

  render() {
    const { ratings } = this.props;
    const { recommend } = this.state;
    const renderedReviews = this.renderReviews();

    return (
      <div>
        <Segment>
          <Header content="Would you recommend this to a friend?"/>
            <Button basic={(recommend === 'yes') ? 0 : 1} color='green' icon='smile outline' content={ratings.recommendations.yes} value='yes' onClick={this.handleRecommend}/>
            <Button basic={(recommend === 'maybe') ? 0 : 1}  icon='meh outline' content={ratings.recommendations.maybe} value='maybe' onClick={this.handleRecommend}/>
            <Button basic={(recommend === 'no') ? 0 : 1}  color='red' icon='frown outline' content={ratings.recommendations.no} value='no' onClick={this.handleRecommend}/>
          </Segment>
        <Segment>
        <Header as='h3'>What people are saying!</Header>
          <Divider hidden/>
          <Feed>
              <Feed.Event>
                <Feed.Label icon='angle up' />
                <Feed.Label icon='angle down' />
                <Feed.Content content="Extremely Fast" />
              </Feed.Event>
              <Feed.Event>
                <Feed.Label icon='angle up' />
                <Feed.Label icon='angle down' />
                <Feed.Content content="Great Design" />
              </Feed.Event>
              <Feed.Event>
                <Feed.Label icon='angle up' />
                <Feed.Label icon='angle down' />
                <Feed.Content content="Fast Charge Time" />
              </Feed.Event>
            </Feed>
            <Input
                action={{ color: 'primary', labelPosition: 'right', icon: 'pencil', content: 'Add Review' }}
                defaultValue='Long Battery Life'
              />

          </Segment>
          <Segment>
                <Comment.Group>
                    <Header as='h3'>Discussion</Header>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                      <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>This has been very useful for my research. Thanks as well!</p>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                  <Comment.Group>
                    <Comment>
                      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                      <Comment.Content>
                        <Comment.Author as='a'>Jenny Hess</Comment.Author>
                        <Comment.Metadata>
                          <div>Just now</div>
                        </Comment.Metadata>
                        <Comment.Text>Elliot you are always so right :)</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Comment>

                <Comment>
                  <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                      <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Form reply>
                  <Form.TextArea />
                  <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
            </Segment>
        </div>
    );
  }
}


     // <Feed>
     //        {renderedReviews}
     //        </Feed>