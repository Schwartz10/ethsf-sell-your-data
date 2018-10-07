import Web3 from 'web3';
import Linnia from '@linniaprotocol/linnia-js';
import StorageContract from '../../build/contracts/Storage.json';
import Truffle from 'truffle-contract';

import { WEB3_INJECTED,
  WEB3_CREATED,
  CHANGED_METAMASK_CREDENTIALS,
  TRANSACTION_SUBMITTED,
  TRANSACTION_MINED,
  TRANSACTION_DENIED,
  TRANSACTION_FAILURE,
  DECRYPTED_DATA_REQUEST,
  DECRYPTED_DATA_SUCCESS,
} from '../../constants/actionTypes';
import { WEB3_ENDPOINT, EXPECTED_INJECTED_WEB3_NETWORK_NUMBER } from '../../constants/endpoints';
import { getAccounts, getNetwork, getBalance } from './web3Promisified';

let web3;
const poaProvider = new Web3(new Web3.providers.HttpProvider('https://u0a1tw4b1z:ZjW6vmc_vaPg1-cl8V6t6WJoLXNHCFyQnkNqCDw1Aas@u0cera7xbb-u0v335sh32-rpc.us-east-2.kaleido.io'))
let linnia;
let keypair;

export const initializeWeb3 = () => async (dispatch) => {
  if (window.web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
    linnia = new Linnia(web3);
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
  web3.eth.sendTransaction({
    from: buyerAddress,
    to: ownerAddress,
    value,
  })
  .on('transactionHash', (txHash) => handleTxSubmit(dispatch, txHash))
  .on('receipt', (txReceipt) => handleTxCompletion(dispatch, txReceipt))
  .on('error', (error, receipt) => handleTxError(dispatch, error, receipt));
}

export const decrypt = (collections, privateKey) => async dispatch => {
  dispatch({ type: DECRYPTED_DATA_REQUEST });

  const storage = Truffle(StorageContract);
  storage.setProvider(poaProvider.currentProvider)
  const storageInstance = await storage.at("0x58b7f94f0e9648820150A844abb3d5666A757d85");
  const poaData = await Promise.all(collections.map(collection => storageInstance.get.call(collection.datahash)));
  const data = poaData.map(encodedData => {
    const parsed = poaProvider.utils.hexToAscii(encodedData);
    return JSON.parse(Linnia.util.decrypt(privateKey, JSON.parse(parsed)));
  })
  dispatch({ type: DECRYPTED_DATA_SUCCESS, data });
}
