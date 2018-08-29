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
  },
  fetching: false,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'REQUEST_PRODUCT':
      return Object.assign({}, state, {
        fetching: true
      })
    // case 'FETCH_PRODUCT_ERROR':
    //   return Object.assign({}, state, {
    //     fetching: action.payload
    // })
    case 'RECEIVE_PRODUCT':
      return Object.assign({}, state, {
        product: action.payload,
        fetching: false
    })
  };
  return state;
}