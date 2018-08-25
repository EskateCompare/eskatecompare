import { applyMiddleware, createStore, combineReducers } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist-2';
import { composeWithDevTools } from 'redux-devtools-extension';

import { promiseMiddleware } from './middleware'

import main from './reducers/main';
import CompareProducts from './reducers/CompareProducts';

const reducer = combineReducers({
  main,
  CompareProducts
})

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, composeWithDevTools(middleware, autoRehydrate()));
persistStore(store);

export default store;
