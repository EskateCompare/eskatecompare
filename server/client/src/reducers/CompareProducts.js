const defaultState = {
  products: {
    products: []
  },
  filter: {
    stats: {
      filterOptions: []
    }
  },
  fetching: false,
  error: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'REQUEST_PRODUCTS':
      return Object.assign({}, state, {
        fetching: true
    })
    case 'FETCH_PRODUCTS_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_PRODUCTS':
      return Object.assign({}, state, {
        products: action.payload,
        fetching: false
    })
    case 'REQUEST_FILTER':
      return Object.assign({}, state, {
        fetching: true
    })
    case 'FETCH_FILTER_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_FILTER':
      return Object.assign({}, state, {
        filter: action.payload,
        fetching: false
    })
  };
  return state;
}