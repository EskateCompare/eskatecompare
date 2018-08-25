import React, { Component } from 'react';
import { Form, Input, Container, Checkbox, Menu, Segment, Button, Header, Icon, Grid, List, Image, Dropdown, Divider, Item, Label } from 'semantic-ui-react';
import Slider from 'react-rangeslider';

class Filter extends Component {
  constructor(props){
    super(props);
      this.state = {
        filter: {},
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
          { filter.title === 'brand' ? <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/> : null}
          { filter.options.map((value) => <Form.Field label={value.label} control={Checkbox} type='checkbox' />) }
        </Form.Group>
        )
      }
    );

    return filterItems;
  }

  render() {
    const { value } = this.state;
    this.renderedFilterOptions = this.renderFilterOptions();
    // console.log(this.state.filterOptions);

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


// <Form.Group grouped>
//             <label>Brand</label>
//             <Form.Field icon='search' control={Input} type='input' placeholder='Search Brands'/>
//             <Form.Field label='Boost' control={Checkbox} type='checkbox' />
//             <Form.Field label='Inboard' control={Checkbox} type='checkbox' />
//           </Form.Group>
//           <Divider/>
//           <Form.Group grouped>
//             <label>Board Type</label>
//             <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
//             <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
//           </Form.Group>
//           <Divider/>
//           <Form.Group grouped>
//             <label>Price</label>
//               <Slider
//                 min={0}
//                 max={100}
//                 value={value}
//                 onChange={this.handleChange}
//               />
//           </Form.Group>
//           <Divider/> 
//           <Form.Group grouped>
//             <label>Max Speed</label>
//             <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
//             <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
//           </Form.Group>
//           <Divider/>
//           <Form.Group grouped>
//             <label>Range</label>
//             <Form.Field label='Longboard' control={Checkbox} type='checkbox' />
//             <Form.Field label='Pennyboard' control={Checkbox} type='checkbox' />
//           </Form.Group>
//           <Divider/>
//           <Form.Group grouped>
//             <label>Motor</label>
//             <Form.Field label='Belt' control={Checkbox} type='checkbox' />
//             <Form.Field label='Hub' control={Checkbox} type='checkbox' />
//           </Form.Group>
