
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';

import initialStates from './initialStates';
import combineReducers from './combineReducers';


const store = createStore(
  combineReducers,
  initialStates,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    createLogger(),
  )),
);

export default store;
