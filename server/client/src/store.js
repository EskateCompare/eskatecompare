import { applyMiddleware, createStore, combineReducers } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist-2';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { promiseMiddleware } from './middleware'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import main from './reducers/main';
import CompareProducts from './reducers/CompareProducts';
import Product from './reducers/Product';

const loggerMiddleware = createLogger()

const reducer = combineReducers({
  main,
  CompareProducts,
  Product,
})

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(reducer, composeWithDevTools(middleware), autoRehydrate());
persistStore(store);

export default store;
