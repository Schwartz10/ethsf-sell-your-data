import Web3 from 'web3';
import Linnia from '@linniaprotocol/linnia-js';
import LinniaOffers from '../../build/contracts/LinniaOffers';
import Truffle from 'truffle-contract';
import { publicKey } from '../../secret'

import { WEB3_INJECTED,
  WEB3_CREATED,
  CHANGED_METAMASK_CREDENTIALS,
  TRANSACTION_SUBMITTED,
  TRANSACTION_MINED,
  TRANSACTION_DENIED,
  TRANSACTION_FAILURE,
} from '../../constants/actionTypes';
import { WEB3_ENDPOINT, EXPECTED_INJECTED_WEB3_NETWORK_NUMBER } from '../../constants/endpoints';
import { getAccounts, getNetwork, getBalance } from './web3Promisified';

let web3;
let linnia;

export const initializeWeb3 = () => async (dispatch) => {
  if (window.web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
    linnia = new Linnia(web3);
    const POAProvider = new Web3(new Web3.providers.HttpProvider('https://u0a1tw4b1z:ZjW6vmc_vaPg1-cl8V6t6WJoLXNHCFyQnkNqCDw1Aas@u0cera7xbb-u0v335sh32-rpc.us-east-2.kaleido.io'))
    POAProvider.eth.getAccounts(console.log)
    web3.eth.getAccounts(console.log)
    // initializeContracts();
    const [[address], network] =
      await Promise.all([getAccounts(), getNetwork()]);

    const balance = address ? await getBalance(address) : 0;

    const validNetwork = EXPECTED_INJECTED_WEB3_NETWORK_NUMBER === network;

    dispatch({
      type: WEB3_INJECTED,
      ethereumAddress: address || '',
      network,
      validNetwork,
      balance,
    });
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(WEB3_ENDPOINT));
    // initializeContracts();
    dispatch({
      type: WEB3_CREATED,
      network: EXPECTED_INJECTED_WEB3_NETWORK_NUMBER,
    });
  }
};

const handleTxSubmit = (dispatch, txHash, callback) => {
  dispatch({ type: TRANSACTION_SUBMITTED, txHash });
  if (callback) callback(txHash);
};

const handleTxCompletion = (dispatch, txReceipt, callback) => {
  dispatch({ type: TRANSACTION_MINED, txReceipt });
  if (callback) callback(txReceipt);
};

const handleTxError = (dispatch, error, receipt, userDeniedTxCb, txFailedCb) => {
  if (error.message.includes('User denied transaction signature')) {
    dispatch({ type: TRANSACTION_DENIED });
    if (userDeniedTxCb) userDeniedTxCb();
  } else {
    dispatch({ type: TRANSACTION_FAILURE, message: error.message, receipt });
    if (txFailedCb) txFailedCb();
  }
};

export const updateWeb3InRedux = (ethereumAddress, network, balance) => dispatch => {
  const validNetwork = EXPECTED_INJECTED_WEB3_NETWORK_NUMBER === network;

  dispatch({
    type: CHANGED_METAMASK_CREDENTIALS,
    ethereumAddress,
    network,
    validNetwork,
    balance,
  });
};

export const buyData = (dataHash, buyerAddress, ownerAddress, value) => async dispatch => {
  console.log(value)
  web3.eth.sendTransaction({
    from: buyerAddress,
    to: ownerAddress,
    value,
  })
  .on('transactionHash', (txHash) => handleTxSubmit(dispatch, txHash))
  .on('receipt', (txReceipt) => handleTxCompletion(dispatch, txReceipt))
  .on('error', (error, receipt) => handleTxError(dispatch, error, receipt));
}
