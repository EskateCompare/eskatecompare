import React, { Component } from 'react';
import { Form, Input, Checkbox, Header, Radio, Icon, Divider } from 'semantic-ui-react';

export default class Filter extends Component {
  constructor() {
    super()

    this.state = {
      showAllBrands: false,
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  handleFilterSelect(e, value) {
    const { title, label, checked } = value;
    const { fetchProducts, onFilterChange, filterState } = this.props;

    onFilterChange({ [title]: label, checked: checked });
    fetchProducts(filterState);
  }

  renderFilterOptions() {
    const { filter } = this.props;
    
    const filterItems = filter.map((option, index) => {
      return (
        <div>
        <Form.Group key={index} grouped>
          <label><Header as='h4'>{option.displayTitle}</Header></label>
          { option.title === 'brands' ? <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/> : null}
          { option.formType === 'checkbox' ? option.options.slice(0, 5).map((value) => <Form.Field label={value.label} title={option.title} onChange={this.handleFilterSelect} control={Checkbox} type='checkbox' />) : null }
          { this.state.showAllBrands ? option.options.slice(5, option.options.length).map((value) => <Form.Field label={value.label} title={option.title} onChange={this.handleFilterSelect} control={Checkbox} type='checkbox' />) : null}
          { option.options.length > 5 && !this.state.showAllBrands ? <div style={{cursor: 'pointer', color: 'blue'}} onClick={() => this.setState({showAllBrands: true})}><Icon name='caret down'/>Show More</div> : null }
          { option.options.length > 5 && this.state.showAllBrands ? <div style={{cursor: 'pointer', color: 'blue'}} onClick={() => this.setState({showAllBrands: false})}><Icon name='caret up'/>Show Less</div> : null }
        </Form.Group>
        <Divider />
        </div>
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