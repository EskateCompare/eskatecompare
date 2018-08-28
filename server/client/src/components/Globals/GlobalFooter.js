import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Icon, Grid, List, Image, Label, Table } from 'semantic-ui-react';

class GlobalFooter extends Component {
  render() {
    return (
      <div style={{display: 'none'}}>
        <Container>
        <List floated='right' horizontal>
          <List.Item disabled href='#'>
            © GitHub, Inc.
          </List.Item>
          <List.Item href='#'>Terms</List.Item>
          <List.Item href='#'>Privacy</List.Item>
          <List.Item href='#'>Contact</List.Item>
        </List>

        <List horizontal>
          <List.Item href='#'>About Us</List.Item>
          <List.Item href='#'>Jobs</List.Item>
        </List>
        </Container>
      </div>
    )
  }
}

export default GlobalFooter;


  