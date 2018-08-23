import React, { Component } from 'react';
import { Form, Input, Container, Checkbox, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Item, Label } from 'semantic-ui-react';

class Filter extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group grouped>
            <label>Brand</label>
            <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/>
            <Form.Field label='Boosted' control={Checkbox} type='checkbox' />
            <Form.Field label='Inboard' control={Checkbox} type='checkbox' />
          </Form.Group>
          <Divider/>
          <Form.Group grouped>
            <label>Board Type</label>
            <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
            <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
          </Form.Group>
          <Divider/>
          <Form.Group grouped>
            <label>Max Speed</label>
            <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
            <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
          </Form.Group>
          <Divider/>
          <Form.Group grouped>
            <label>Range</label>
            <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
            <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
          </Form.Group>
          <Divider/>
          <Form.Group grouped>
            <label>Motor</label>
            <Form.Field label='Belt' control={Checkbox} type='checkbox' />
            <Form.Field label='Hub' control={Checkbox} type='checkbox' />
          </Form.Group>
        </Form>   
      </div>
    );
  }
}

export default Filter;
