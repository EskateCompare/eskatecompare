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

export function fetchProductError(payload) {
  return {
    type: 'FETCH_PRODUCT_ERROR',
    payload
  }
}

export function fetchProduct(payload) {
  return dispatch => {
    dispatch(requestProduct())
    return fetch(`/api/products/${payload}`)
      .then(response => response.json())
      .then(json => dispatch(receiveProduct(json)))
      .catch(err => dispatch(fetchProductError(err)))
  }
}

export function requestPostRecommend() {
  return {
    type: 'REQUEST_POST_RECOMMEND',
  }
}

export function receivePostRecommend(payload) {
  return {
    type: 'RECEIVE_POST_RECOMMEND',
    payload
  }
}

export function fetchPostRecommendError(payload) {
  return {
    type: 'FETCH_POST_RECOMMEND_ERROR',
    payload
  }
}

export function fetchPostRecommend(payload) {
  console.log(JSON.stringify(payload));
  return dispatch => {
    dispatch(requestPostRecommend())
    return fetch('/api/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receivePostRecommend(json)))
    .catch(err => dispatch(fetchPostRecommendError(err)))
  }
}
