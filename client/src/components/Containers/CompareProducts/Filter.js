import React, { Component } from 'react';
import { Form, Input, Container, Checkbox, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Item, Label } from 'semantic-ui-react';

class Filter extends Component {
  constructor(props){
    super(props);
      this.state = {
        filter: [],
        value: 10
    }
  }

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  componentDidMount() {
    fetch(`http://localhost:3000/api/filter-options`)
      .then(response => response.json())
      .then(json => this.setState({filter: json.stats.filterOptions}))
  }

  renderFilterOptions() {
    const { filter } = this.state;

    const filterItems = filter.map((option, index) => {
      return (
        <Form.Group key={index} grouped>
          <label>{option.title}</label>
          { option.title === 'brands' ? <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/> : null}
          { option.options.map((value) => <Form.Field label={value.label} control={Checkbox} type='checkbox' />) }
        </Form.Group>
        )
      }
    );

    return filterItems;
  }

  render() {
    const { value } = this.state;
    this.renderedFilterOptions = this.renderFilterOptions();
    // console.log(this.state.filter);

    return (
      <div>
        <Form>
          {this.renderedFilterOptions}
        </Form>   
      </div>
    );
  }
}

export default Filter;