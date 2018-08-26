import React, { Component } from 'react';
import { Form, Label, Input, Checkbox } from 'semantic-ui-react';

export default class Filter extends Component {
  renderFilterOptions() {
    const { filter: filter } = this.props;

    const filterItems = filter.map((option, index) => {
      return (
        <Form.Group key={index} grouped>
          <label>{option.displayTitle}</label>
          { option.title === 'brands' ? <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/> : null}
          { option.options.map((value) => <Form.Field label={value.label} control={Checkbox} type='checkbox' />) }
        </Form.Group>
        )
      }
    );

    return filterItems;
  }

  render() {
    this.renderedFilterOptions = this.renderFilterOptions();

    return (
      <div>
        <Form>
          {this.renderedFilterOptions}
        </Form>   
      </div>
    );
  }
}