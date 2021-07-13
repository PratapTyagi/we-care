import factory from "./build/Factory.json";
import web3 from "./web3.js";

export default new web3.eth.Contract(
  JSON.parse(factory.interface),
  "0x26C999FC07e330A62Fc6382fb20b23b01d8c5515"
);
