const Web3 = require("web3");

let web3;
if (typeof window !== undefined && window.web3 !== undefined) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3.provider.HttpProvider(
    "https://rinkeby.infura.io/v3/18da8c6c0290455f8ad62a79264b6569"
  );
}

export default web3;
