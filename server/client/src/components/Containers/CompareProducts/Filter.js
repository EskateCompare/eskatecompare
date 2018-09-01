import React, { Component } from 'react';
import { Form, Label, Input, Checkbox, Header } from 'semantic-ui-react';

export default class Filter extends Component {
  constructor() {
    super()

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  handleFilterSelect(e, value) {
    console.log(value);
  }

  renderFilterOptions() {
    const { filter } = this.props;

    const filterItems = filter.map((option, index) => {
      return (
        <Form.Group key={index} grouped>
          <label><Header as='h4'>{option.displayTitle}</Header></label>
          { option.title === 'brands' ? <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/> : null}
          { option.options.map((value) => <Form.Field label={value.label} onChange={this.handleFilterSelect} control={Checkbox} type='checkbox' />) }
        </Form.Group>
        )
      }
    );

    return filterItems;
  }

  render() {
    const renderedFilterOptions = this.renderFilterOptions();

    return (
      <div>
        <Form>
          {renderedFilterOptions}
        </Form>   
      </div>
    );
  }
}