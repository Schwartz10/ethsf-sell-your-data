
import { web3InitialState } from '../containers/web3';
import { listingsInitialState } from '../containers/listings';

const initialState = {
  web3: web3InitialState,
  listings: listingsInitialState,
};

export default initialState;
