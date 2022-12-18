import Web3modal from "web3modal";
import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    const web3ModalInstance = new Web3modal({
      cacheProvider: false,
    });
    const web3modal = await web3ModalInstance.connect();
    const web3Provider = new ethers.providers.Web3Provider(web3modal);

    return web3Provider.provider.selectedAddress;
  } catch (error) {
    console.log(error);
  }
};
