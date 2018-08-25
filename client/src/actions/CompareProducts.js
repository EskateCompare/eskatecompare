import fetch from 'cross-fetch'
// import { constants: SET_FILTER, SET_PRODUCTS } from '../constants';

export function setFilter(payload){
  return {
    type: 'SET_FILTER',
    payload
  }
}

export function setProducts(payload){
  return {
    type: 'SET_PRODUCTS',
    payload
  }
}

export function fetchFilter() {
  return dispatch => {
    return fetch(`http://localhost:3000/api/filter-options`)
      .then(response => response.json())
      .then(json => dispatch(setFilter(json)))
  }
}

export function fetchProducts() {
  return dispatch => {
    return fetch(`http://localhost:3000/api/products`)
      .then(response => response.json())
      .then(json => dispatch(setProducts(json)))
  }
}