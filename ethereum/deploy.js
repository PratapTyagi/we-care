const HdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/Factory.json");

const provider = new HdWalletProvider(
  "acoustic armor gain urge gesture wild furnace save nation range page excite",
  "https://rinkeby.infura.io/v3/18da8c6c0290455f8ad62a79264b6569"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "4000000" });

  console.log(result.options.address);
};

deploy();
