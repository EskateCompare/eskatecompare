const defaultState = {
  user: {
  	recommendations: [],
  }
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_USER_RECOMMENDATION':
      let recommendationsArr = [];
      let filteredArray = state.user.recommendations;

      for(let recommendation of state.user.recommendations) {
        if (recommendation.product === action.payload.product) {
          filteredArray = state.user.recommendations.filter(item => item.product !== recommendation.product)
        }
      }

      recommendationsArr = [].concat(filteredArray, action.payload)

      return Object.assign({}, state, {
        user: {
        	recommendations: recommendationsArr
        }
    })
    default:
      return state;
  }
}
