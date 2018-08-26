import { applyMiddleware, createStore, combineReducers } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist-2';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { promiseMiddleware } from './middleware'

import main from './reducers/main';
import CompareProducts from './reducers/CompareProducts';

const loggerMiddleware = createLogger()

const reducer = combineReducers({
  main,
  CompareProducts
})

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);
const withDevTools = composeWithDevTools(middleware, autoRehydrate());

export default function configureStore(preloadedState) {
  return createStore(
    reducer, 
    preloadedState,
    withDevTools,
  )
}