import actions from '../actions/CompareProducts';
// import { SET_FILTER, SET_PRODUCTS } from '../constants';

const defaultState = {
  products: [],
  filter: {},
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return Object.assign({}, state, {
        filter: action.payload
      })
    case 'SET_PRODUCTS':
      return Object.assign({}, state, {
        products: action.payload
      })   
  };
  return state;
}