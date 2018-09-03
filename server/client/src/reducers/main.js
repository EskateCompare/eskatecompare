const defaultState = {
  appName: 'SkateCompare',
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        appLoaded: true
      };
    case 'REDIRECT':
      return {...state, redirectTo: null };

    case 'RETRIEVE_SINGLE_PRODUCT':
      return {...state, product: action.value}
    default:
      return state;
    }
};
