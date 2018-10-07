import {
  WEB3_INJECTED,
  WEB3_CREATED,
  CHANGED_METAMASK_CREDENTIALS,
  TRANSACTION_ATTEMPT,
  TRANSACTION_SUBMITTED,
  TRANSACTION_DENIED,
  TRANSACTION_FAILURE
} from '../../constants/actionTypes';

import initialState from './initialState';

/* eslint-disable complexity */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_INJECTED:
      return {
        ...state,
        hasWeb3: true,
        createdWeb3: false,
        injectedWeb3: true,
        currentNetwork: action.network,
        validNetwork: action.validNetwork,
        ethereumAddress: action.ethereumAddress,
        balance: action.balance
      }
    case WEB3_CREATED:
      return {
        ...state,
        hasWeb3: true,
        createdWeb3: true,
        injectedWeb3: false,
        currentNetwork: action.network,
      }
    case CHANGED_METAMASK_CREDENTIALS:
      return {
        ...state,
        currentNetwork: action.network,
        validNetwork: action.validNetwork,
        ethereumAddress: action.ethereumAddress ? action.ethereumAddress : '',
        balance: action.balance,
      }
    case TRANSACTION_ATTEMPT:
      return { ...state, transactionAttempting: true }
    case TRANSACTION_SUBMITTED:
      return { ...state, transactionAttempting: false }
    case TRANSACTION_DENIED:
      return { ...state, transactionAttempting: false }
    case TRANSACTION_FAILURE:
      return { ...state, transactionAttempting: false }
    default:
      return state;
  }
};

export default reducer;
