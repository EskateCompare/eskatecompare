const defaultState = {
  searchResults: [],
  fetching: false,
  error: null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'REQUEST_TEXT_SEARCH':
      return Object.assign({}, state, {
        fetching: true
    })
    case 'FETCH_TEXT_SEARCH_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_TEXT_SEARCH':
      return Object.assign({}, state, {
        searchResults: action.payload,
        fetching: false
    })
    default:
      return state;
  }
}
