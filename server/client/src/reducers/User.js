const defaultState = {
  user: {
  	recommendations: [
	  	{
	  		product: '',
	  		recommend: ''
	  	},
  	],
  }
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_USER_RECOMMENDATION':
    console.log(action, 'userrrractionnn')
      return Object.assign({}, state, {
        user: {
        	recommendations: action.payload
        }
    })
    default:
      return state;
  }
}
