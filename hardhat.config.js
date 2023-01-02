require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const INFURA_API = process.env.INFURA_API;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.4.17",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: INFURA_API,
      accounts: [PRIVATE_KEY],
    },
  },
};
