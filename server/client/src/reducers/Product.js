const defaultState = {
  product: {
    product: {
  		name: '',
      brand: {
        logo: '',
      },
      deals: [],
      displaySpecs: [],
      reviews: [],
      specs: {},
  		ratings: {
  			compositeScore: 0,
        recommendations: {
          yes: 0,
          no: 0,
          maybe: 0,
        }
  		},
      image: {},
      additionalImages: [],
      slug: '',
  	}
  },
  fetching: false,
  error: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'REQUEST_PRODUCT':
      return Object.assign({}, state, {
        fetching: true
    })
    case 'FETCH_PRODUCT_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_PRODUCT':
      return Object.assign({}, state, {
        product: action.payload,
        fetching: false
    })
    case 'REQUEST_POST_RECOMMEND':
      return Object.assign({}, state, {
        // fetching: true
    })
    case 'FETCH_POST_RECOMMEND_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_POST_RECOMMEND':
      return Object.assign({}, state, {
        product: {
          ...state.product,
          product: {
            ...state.product.product,
            ratings: {
              ...state.product.product.ratings,
              recommendations: action.payload
            } 
          }
        }
        // fetching: false
    })
    default:
      return state;
  }
}