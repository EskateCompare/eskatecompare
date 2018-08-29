import fetch from 'cross-fetch'
// import { constants: SET_FILTER, SET_PRODUCTS } from '../constants';

export function requestProduct() {
  return {
    type: 'REQUEST_PRODUCT',
  }
}

export function receiveProduct(payload) {
  return {
    type: 'RECEIVE_PRODUCT',
    payload
  }
}

export function fetchProduct(payload) {
  return dispatch => {
    dispatch(requestProduct())
    return fetch(`/api/products/${payload}`)
      .then(response => response.json())
      .then(json => dispatch(receiveProduct(json)))
  }
}


