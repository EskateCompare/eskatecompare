import React, { Component } from 'react';
import { Form, Input, Checkbox, Header, Radio, Icon, Divider, Label } from 'semantic-ui-react';

export default class Filter extends Component {
  constructor() {
    super()

    this.state = {
      showAllOptions: false,
      checkedItems: []
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleShowAllOptions = this.handleShowAllOptions.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { filterState, fetchFilter } = this.props;

    if (prevProps.filterState !== filterState ) {
      fetchFilter(filterState);
    } 
  }

  handleFilterSelect(e, value) {
    const { checkedItems } = this.state;
    const { title, label, checked } = value;
    const { fetchProducts, onFilterChange, filterState, fetchFilter } = this.props;

    onFilterChange({ [title]: label, checked: checked });
    fetchFilter(filterState);
    fetchProducts(filterState);
  }

  handleShowAllOptions() {
    this.setState(prevState =>
      ({ showAllOptions: !prevState.showAllOptions })
    );
  }

  renderFilterGroups() {
    const { filter } = this.props;
    const { showAllOptions } = this.state;

    const filterItems = filter.map((option, index) => {
      return (
        <div key={index}>
          <Form.Group grouped>
            <label><Header as='h4'>{option.displayTitle}</Header></label>
            { option.title === 'brands' ? <SearchOptions /> : null }
            { option.formType === 'checkbox' ? option.options.slice(0, 5).map((value) => <Checkboxes option={option} value={value} handleFilterSelect={this.handleFilterSelect}/>) : null }
            { showAllOptions ? option.options.slice(5, option.options.length).map((value) => <Checkboxes option={option} value={value} handleFilterSelect={this.handleFilterSelect}/>) : null}
            { option.options.length > 5 && showAllOptions ? <ShowAllOptionsButton handleShowAllOptions={this.handleShowAllOptions}/> : null }
            { option.options.length > 5 && showAllOptions ? <ShowAllOptionsButton handleShowAllOptions={this.handleShowAllOptions}/> : null }
          </Form.Group>
          <Divider />
        </div>
        )
      }
    );

    return filterItems;
  }

  render() {
    const renderedFilterGroups = this.renderFilterGroups();

    return (
      <Form>
        {renderedFilterGroups}
      </Form>   
    );
  }
}

class SearchOptions extends Component {
  render() {
    return (
      <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/>
    )
  } 
}

class Checkboxes extends Component {
  render() {
    const { option, value, handleFilterSelect } = this.props;

    const hideLabelCountStyle = {
      display: value.checked ? 'none' : null
    }

    return (
      <Form.Field>
        <Checkbox checked={value.checked} label={value.label} title={option.title} onChange={handleFilterSelect}/>
        <Label style={hideLabelCountStyle} circular content={value.count}/>
      </Form.Field>
    )
  } 
}

class ShowAllOptionsButton extends Component {
  render() {
    const { handleShowAllOptions } = this.props;
    const showButtonStyle = {
      cursor: 'pointer',
      color: 'blue',
    }

    return(
      <div style={showButtonStyle} onClick={handleShowAllOptions}>
        <Icon name='caret down'/>Show More
      </div>
    )
  }
}
