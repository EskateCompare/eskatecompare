import React, { Component } from 'react';
import { Header, Feed, Rating, Divider, Form, Button, Segment, Input, Comment, Statistic, Icon, Message, Transition, Grid } from 'semantic-ui-react';

const image = 'https://react.semantic-ui.com/images/wireframe/square-image.png';
const impressions = [
  {
    name: 'Extremely Fast',
    value: 12
  },
    {
    name: 'Great Design',
    value: 25
  },
    {
    name: 'Long Range',
    value: 19
  },
    {
    name: 'Great Steering',
    value: 6
  },
    {
    name: 'Slow Charge Time',
    value: 2
  },
    {
    name: 'Low Battery Life',
    value: 3
  },
]

export default class ReviewList extends Component {
  constructor(props) {
    super(props)

    let recommend = '';
    let didUserRecommend = false;

    for (let recommendation of props.user.recommendations){
      if (recommendation.product === props.slug){
        recommend = recommendation.recommend
        didUserRecommend = true
      }
    }

    this.state = {
      recommend: recommend,
      didUserRecommend: didUserRecommend,
      visible: true,

    }

    this.handleRecommend = this.handleRecommend.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({visible: !this.state.visible})
    console.log(this.state.visible)
  }

  handleRecommend(event, target) {
    const { recommend } = this.state;

    if (target.value === recommend) {
      return;
    }

    const { fetchPostRecommend, slug, addUserRecommendation, didUserRecommend } = this.props;
   
    this.setState({ recommend: target.value })

    const requestObject = {
      product: slug,
      recommendChange: {
        yes: (target.value === 'yes') ? 1 : (recommend === 'yes') ? -1 : 0,
        maybe: (target.value === 'maybe') ? 1 : (recommend === 'maybe') ? -1 : 0,
        no: (target.value === 'no') ? 1 : (recommend === 'no' ) ? -1 : 0,
      }
    }

    addUserRecommendation({
      product: slug,
      recommend: target.value
    });

    fetchPostRecommend(requestObject);
  }

  renderImpressions() {
    const renderImpressions = impressions.map((impression, index) => {
      return (
        <Grid.Column> 
          <Message>
            <Feed>        
             <Feed.Event compact>
                <Statistic size='mini'>
                  <Statistic.Value>
                    <Transition animation='jiggle' duration={500} visible={this.state.visible}>
                      <Icon name='angle up' size='large' onMouseEnter={this.toggleVisibility} onMouseLeave={this.toggleVisibility}/>     
                    </Transition>
                    </Statistic.Value>
                  <Statistic.Label>{impression.value}</Statistic.Label>
                </Statistic>
                <Feed.Content style={{padding: '15px'}} content={impression.name} />
              </Feed.Event>
            </Feed>
          </Message>
        </Grid.Column>
        )
      }
    );

    return renderImpressions;
  }

  render() {
    const { ratings } = this.props;
    const { recommend } = this.state;
    const renderedImpressions = this.renderImpressions();

    return (
      <div>
        <Segment>
          <Header content="Would you recommend this to a friend?"/>
            <Button basic={(recommend === 'yes') ? 0 : 1} color='green' icon='smile outline' content={ratings.recommendations.yes} value='yes' onClick={this.handleRecommend}/>
            <Button basic={(recommend === 'maybe') ? 0 : 1}  icon='meh outline' content={ratings.recommendations.maybe} value='maybe' onClick={this.handleRecommend}/>
            <Button basic={(recommend === 'no') ? 0 : 1}  color='red' icon='frown outline' content={ratings.recommendations.no} value='no' onClick={this.handleRecommend}/>
          </Segment>
        <Segment>
          <Header as='h3'>Impressions</Header>
            <Divider hidden/>
            <Grid container columns={3} stackable>
              {renderedImpressions}
            </Grid>
            <Divider hidden/>
            <Input
                action={{ color: 'primary', content: 'Add Review' }}
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
                <Button onClick={this.toggleVisibility} content='Add Comment' primary />
              </Form>
            </Comment.Group>
          </Segment>
        </div>
    );
  }
}