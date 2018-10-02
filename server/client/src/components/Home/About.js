import React, { Component } from 'react';
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
					      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
					      <Item.Content>
					        <Item.Header>Michael WV</Item.Header>
					        <Item.Meta content='Software Engineer'/>
					        <Item.Description>{paragraph}</Item.Description>
					        <Item.Extra>
					          <Button circular icon='linkedin' color='linkedin' />
										<Button circular icon='github' color='github' />
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


