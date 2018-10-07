const Web3 = require('web3');
const Linnia = require('@linniaprotocol/linnia-js');
const StorageContract = require('./src/build/contracts/Storage.json');
const Truffle = require('truffle-contract');
const poaProvider = new Web3(new Web3.providers.HttpProvider('https://u0a1tw4b1z:ZjW6vmc_vaPg1-cl8V6t6WJoLXNHCFyQnkNqCDw1Aas@u0cera7xbb-u0v335sh32-rpc.us-east-2.kaleido.io'))

async function script(){
  const storage = Truffle(StorageContract);
  storage.setProvider(poaProvider.currentProvider)
  const storageInstance = await storage.at("0x58b7f94f0e9648820150A844abb3d5666A757d85");
  const data = await storageInstance.get.call('0xa1fe2d5ed0ac4e35be7b62a436a4dc4b4568f997dce06ed57e0f7fda900f8916');
  const ascii = poaProvider.utils.hexToAscii(data);
  // try {
  //   // const decrypted = Linnia.util.decrypt(, JSON.parse(ascii));
  //   // console.log(decrypted)
  // } catch (err) {
  //   console.log(err);
  // }
}


script();