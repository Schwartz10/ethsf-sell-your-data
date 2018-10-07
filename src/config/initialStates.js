
import { web3InitialState } from '../containers/web3';
import { listingsInitialState } from '../containers/listings';
import { collectionsInitialState } from '../containers/collections';

const initialState = {
  web3: web3InitialState,
  listings: listingsInitialState,
  collections: collectionsInitialState,
};

export default initialState;
