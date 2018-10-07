import { combineReducers } from 'redux';

import { web3Reducer } from '../containers/web3';
import { listingsReducer } from '../containers/listings'
import { collectionsReducer } from '../containers/collections';

const reducer = combineReducers({
  web3: web3Reducer,
  listings: listingsReducer,
  collections: collectionsReducer,
});

export default reducer;