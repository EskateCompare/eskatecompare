import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, List, Segment, Grid, Header, Icon, Item, Image, Button } from 'semantic-ui-react';

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class About extends Component {
  render() {
    return (
      <div>
	      <Container style={{padding: '200px 0'}} text>
	      <Header>About</Header>
	        <Segment>
	        	<Item.Group>
	 						<Item>
					      <Item.Image size='tiny' src='https://dgalywyr863hv.cloudfront.net/pictures/athletes/34706203/10280548/1/large.jpg' />
					      <Item.Content>
					        <Item.Header>Michael WV</Item.Header>
					        <Item.Meta content='Software Engineer'/>

					        <Item.Description>Michael is the site's backend guru. If you notice any faulty data,
                    you know who to blame. He's also into keto, running, and wishes he bought
                    more bitcoin. </Item.Description>
					        <Item.Extra>
                    <a href='https://www.linkedin.com/in/michael-valentine-360a1954/' target='_blank'>
					               <Button circular icon='linkedin' color='linkedin' />
                    </a>
                    <a href='https://github.com/mwvalen' target='_blank'>
                      <Button circular icon='github' color='github' />
                    </a>
                    <a href='https://www.strava.com/athletes/34706203' target='_blank'>
                      <Button circular icon='strava' color='orange' />
                    </a>
									</Item.Extra>
      					</Item.Content>
						 </Item>
    				</Item.Group>
    			</Segment>
					<Segment>
						<Item.Group>
				    	<Item>
					      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
					      <Item.Content>
					        <Item.Header>Warren EP</Item.Header>
					        <Item.Meta content='Software Engineer' />
					        <Item.Description>{paragraph}</Item.Description>
					        <Item.Extra>
					          <Button circular icon='linkedin' color='linkedin' />
										<Button circular icon='github' color='github' />
									</Item.Extra>
					      </Item.Content>
					    </Item>
  					</Item.Group>
	        </Segment>
        </Container>
      </div>
    )
  }
}

export default About;
