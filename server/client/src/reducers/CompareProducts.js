import { Map, updateIn, update, setIn, set } from 'immutable';

const defaultState = {
  products: {
    products: []
  },
  filter: {
    stats: {
      filterOptions: []
    }
  },
  filterState: {
    brands: [],
    year: [],
    price: [],
    range: [],
    sortBy: 'rating',
    sortDir: 'asc',
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
    case 'ON_FILTER_CHANGE':
      const { payload } = action;
      const { checked } = payload;
      const key = Object.keys(action.payload)[0];
      const arr = state.filterState[key];
      const finalArr = checked ? arr.concat(action.payload[key]) : arr.filter(val => val !== action.payload[key]);
      state.filterState[key] = finalArr;

      return Object.assign({}, state, {
        filterState: state.filterState
    })
    case 'ON_SORT_DIRECTION':
      const sortDir = Object.assign({}, state.filterState, action.payload)

      return Object.assign({}, state, {
        filterState: sortDir
      })

    case 'ON_SORT_BY':
      const sortBy = Object.assign({}, state.filterState, action.payload)

      return Object.assign({}, state, {
        filterState: sortBy
    })
  };
  return state;
}