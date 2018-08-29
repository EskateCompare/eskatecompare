import fetch from 'cross-fetch'

export function requestFilter() {
  return {
    type: 'REQUEST_FILTER',
  }
}

export function receiveFilter(payload) {
  return {
    type: 'RECEIVE_FILTER',
    payload
  }
}

export function fetchFilterError(payload) {
  return {
    type: 'FETCH_FILTER_ERROR',
    payload
  }
}

export function fetchFilter() {
  return dispatch => {
    dispatch(requestFilter())
    return fetch(`/api/filter-options/`)
      .then(response => response.json())
      .then(json => dispatch(receiveFilter(json)))
      .catch(err => dispatch(fetchFilterError(err)))
  }
}

export function requestProducts() {
  return {
    type: 'REQUEST_PRODUCTS',
  }
}

export function receiveProducts(payload) {
  return {
    type: 'RECEIVE_PRODUCTS',
    payload
  }
}

export function fetchProductsError(payload) {
  return {
    type: 'FETCH_PRODUCTS_ERROR',
    payload
  }
}

export function fetchProducts() {
  return dispatch => {
    dispatch(requestProducts())
    return fetch(`/api/products`)
      .then(response => response.json())
      .then(json => dispatch(receiveProducts(json)))
      .catch(err => dispatch(fetchProductsError(err)))
  }
}