import React, { Component } from 'react';
import { Grid, List, Label } from 'semantic-ui-react';

export default class SpecList extends Component {
  renderSpec() {
    const { displaySpecs } = this.props.specs;

    const renderSpec = displaySpecs.map((spec, index) => {
      const { displayName, icon, value } = spec;
      return (
        <List.Item>
          <List.Content floated='right'>
            <Label>{value}</Label>
          </List.Content>
          <List.Icon name={icon} size='large'/>
          <List.Content>{displayName}</List.Content>
        </List.Item>
        )
      }
    );

    return renderSpec;
  }

  render() {
    const renderedSpec = this.renderSpec();

    return (
      <List relaxed='very' verticalAlign='middle'>
        {renderedSpec}
      </List>
    );
  }
}