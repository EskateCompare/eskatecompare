import React, { Component } from 'react';
import { Container, List, Segment, Grid, Header, Icon, Modal, Button, Image, Form, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class GlobalFooter extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{marginTop: '80px'}}>
        <Segment inverted vertical>
        <Container>
          <List inverted floated='right' horizontal>
            <List.Item href='#'><Icon className='heart'/> We Love Electric Boards! </List.Item>
          </List>

          <List inverted horizontal>
            <List.Item as={Link} to='/about'>About</List.Item>
            <List.Item onClick={this.show('inverted')}>Feedback</List.Item>
          </List>
          </Container>
        </Segment>
        <Modal style={{height: '250px'}} className='scrolling' dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Submit Feedback</Modal.Header>
          <Modal.Content>
            <Form>
              <TextArea autoHeight placeholder='We love hearing from you!' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              fluid
              icon='checkmark'
              labelPosition='right'
              content='Submit'
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default GlobalFooter;


  