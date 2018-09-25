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
  			compositeScore: 0
  		},
      image: {},
      additionalImages: [],
  	}
  },
  fetching: false,
  error: null,
  recommend: {
    yes: 0,
    no: 0,
    maybe: 0,
  }
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
        fetching: true
    })
    case 'FETCH_POST_RECOMMEND_ERROR':
      return Object.assign({}, state, {
        error: action.payload
    })
    case 'RECEIVE_POST_RECOMMEND':
      return Object.assign({}, state, {
        recommend: action.payload,
        fetching: false
    })
    default:
      return state;
  }
}