import Web3 from 'web3';

import { WEB3_INJECTED,
  WEB3_CREATED,
  CHANGED_METAMASK_CREDENTIALS,
} from '../../constants/actionTypes';
import { WEB3_ENDPOINT, EXPECTED_INJECTED_WEB3_NETWORK_NUMBER } from '../../constants/endpoints';
import { getAccounts, getNetwork, getBalance } from './web3Promisified';

let web3;

export const initializeWeb3 = () => async (dispatch) => {
  if (window.web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
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