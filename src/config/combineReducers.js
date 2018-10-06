import { combineReducers } from 'redux';

import { web3Reducer } from '../containers/web3';
import { listingsReducer } from '../containers/listings'

const reducer = combineReducers({
  web3: web3Reducer,
  listings: listingsReducer,
});

export default reducer;