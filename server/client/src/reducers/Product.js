import actions from '../actions/Product';
// import { SET_FILTER, SET_PRODUCTS } from '../constants';

const defaultState = {
product: {
    product: {
  		name: '',
      deals: [],
      reviews: [],
      specs: {},
  		ratings: {
  			compositeScore: 0
  		},
      image: {},
      additionalImages: [],
  	}
  }
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_PRODUCT':
      return Object.assign({}, state, {
        product: action.payload
      })
  };
  return state;
}