import fetch from 'cross-fetch'

export function requestTextSearch() {
  return {
    type: 'REQUEST_TEXT_SEARCH',
  }
}

export function receiveTextSearch(payload) {
  return {
    type: 'RECEIVE_TEXT_SEARCH',
    payload
  }
}

export function fetchTextSearchError(payload) {
  return {
    type: 'FETCH_TEXT_SEARCH_ERROR',
    payload
  }
}

export function fetchTextSearch(payload) {
  return dispatch => {
    dispatch(requestTextSearch())
    return fetch(`/api/text-search?searchString=${payload}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTextSearch(json)))
      .catch(err => dispatch(fetchTextSearchError(err)))
  }
}