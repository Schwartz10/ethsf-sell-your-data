export const getAccounts = () => new Promise((resolve, reject) => {
  return window.web3.eth.getAccounts((err, accounts) => {
    if (err) reject(err);
    else resolve(accounts);
  });
});

export const getNetwork = () => new Promise((resolve, reject) => {
  return window.web3.version.getNetwork((err, network) => {
    if (err) reject(err);
    else resolve(network);
  });
});

export const getBalance = (address) => new Promise((resolve, reject) => {
  return window.web3.eth.getBalance(address, (err, balanceInWei) => {
    const balance = Number(window.web3.fromWei(balanceInWei, 'ether').toString(10));
    if (err) reject(err);
    else resolve(balance);
  });
});

export const signEthAddress = from => new Promise((res, rej) => {
  const msg = ethUtil.bufferToHex(new Buffer(WEB3_LOGIN_MESSAGE, 'utf8')); // eslint-disable-line
  window.web3.personal.sign(msg, from, (err, result) => {
    if (err) rej('There was an error signing'); // eslint-disable-line
    res(result);
  });
});

export const getTxReceipt = hashString => new Promise((resolve, reject) => {
  return window.web3.eth.getTransactionReceipt(hashString, ((err, res) => {
    if (err) reject(err);
    resolve(res);
  }));
});

export const getBlockNumber = () => new Promise((resolve, reject) => {
  return window.web3.eth.getBlockNumber((err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});