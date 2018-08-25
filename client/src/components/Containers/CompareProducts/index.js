import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompareProducts from './CompareProducts';
import { fetchProducts } from '../../../actions/CompareProducts';

const mapStateToProps = function(state) {
  // return ({
  //   ...state.main
  // })
}

const mapDispatchToProps = dispatch => ({
	fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(CompareProducts);
