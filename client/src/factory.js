import factory from "./build/Factory.json";
import web3 from "./web3.js";

export default new web3.eth.Contract(
  JSON.parse(factory.interface),
  "0x1Fa6Be25A4291b52FAcb2B233803AdbB0a24e72a"
);
