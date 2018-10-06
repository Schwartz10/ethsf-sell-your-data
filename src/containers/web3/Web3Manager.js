import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initializeWeb3,
  updateWeb3InRedux,
  } from './actions';
import { getNetwork, getAccounts, getBalance } from './web3Promisified';

export class Web3Manager extends Component {
  static propTypes = {
    initializeWeb3: PropTypes.func.isRequired,
    updateWeb3InRedux: PropTypes.func.isRequired,
    currentNetwork: PropTypes.string.isRequired,
    hasInjectedWeb3: PropTypes.bool.isRequired,
    hasCreatedWeb3: PropTypes.bool.isRequired,
    currentAddress: PropTypes.string.isRequired,
    updateExchangeRateInRedux: PropTypes.func.isRequired,
    currentExchangeRate: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.pollMetaMask = this.pollMetaMask.bind(this);
  }

  async componentDidMount() {
    await this.props.initializeWeb3();
    this.pollMetaMask();
  }

  async pollMetaMask() {
    const {
      hasInjectedWeb3,
      hasCreatedWeb3,
      currentNetwork,
      currentAddress,
      currentBalance,
    } = this.props;
    // this condition will likely never be hit, a user may HAVE to refresh page in order to populate window obj
    if (hasCreatedWeb3 && window.web3 !== undefined) {
      // if we createdWeb3, but now there is a window object, the user installed metamask
      await this.props.initializeWeb3();
    } else if (hasInjectedWeb3) {
      const [[account], network] = await Promise.all([getAccounts(), getNetwork()]);

      let balance;
      if (account) balance = await getBalance(account);

      // check to see what changed from metamask
      const accountChanged = !!(account) !== !!(currentAddress);
      const networkChanged = network !== currentNetwork;
      const balanceChanged = balance !== currentBalance;

      const web3StateChanged = accountChanged || networkChanged || balanceChanged;
      if (web3StateChanged) this.props.updateWeb3InRedux(account, network, balance);
    }

    setTimeout(this.pollMetaMask, 1500);
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasInjectedWeb3: state.web3.injectedWeb3,
    hasCreatedWeb3: state.web3.createdWeb3,
    currentNetwork: state.web3.currentNetwork,
    currentAddress: state.web3.ethereumAddress,
    currentBalance: state.web3.balance,
  };
};

export default connect(mapStateToProps,
  {
    initializeWeb3,
    updateWeb3InRedux,
  })(Web3Manager);
