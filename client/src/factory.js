import factory from "./build/Factory.json";
import web3 from "./web3.js";

export default new web3.eth.Contract(
  JSON.parse(factory.interface),
  "0xac8c5f189185291fF2E1Dd5a5C049aEFe798f0bc"
);
