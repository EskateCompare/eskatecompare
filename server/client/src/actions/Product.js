import fetch from 'cross-fetch'
// import { constants: SET_FILTER, SET_PRODUCTS } from '../constants';

export function setProduct(payload){
  return {
    type: 'SET_PRODUCT',
    payload
  }
}

export function fetchProduct(payload) {
	console.log(payload, 'payload')
  return dispatch => {
    return fetch(`/api/products/${payload}`)
      .then(response => response.json())
      .then(json => dispatch(setProduct(json)))
  }
}
