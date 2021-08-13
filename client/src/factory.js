import factory from "./build/Factory.json";
import web3 from "./web3.js";

export default new web3.eth.Contract(
  JSON.parse(factory.interface),
  "0x8cAd1604BBA5AdFAa2A9a2C68da3D15E38f30837"
);
