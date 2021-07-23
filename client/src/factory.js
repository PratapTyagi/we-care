import factory from "./build/Factory.json";
import web3 from "./web3.js";

export default new web3.eth.Contract(
  JSON.parse(factory.interface),
  "0xc696b457C870Bc6d374faF911896BAFC9D03A013"
);
