import { combineReducers } from 'redux';

import { web3Reducer } from '../containers/web3';

const reducer = combineReducers({
  web3: web3Reducer,
});

export default reducer;