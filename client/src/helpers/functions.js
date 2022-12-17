import FactoryJSON from "../abi/Factory.json";
import CampaignJSON from "../abi/Campaign.json";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

// Provider toggle on change of environment
const provider =
  process.env.REACT_APP_ENVIRONMENT === "localhost"
    ? new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545")
    : new ethers.providers.InfuraProvider("rinkeby");

// IPFS connection for image upload
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

// For updating metamask interaction is neccessory for any client
const fetchSignerForUpdation = async () => {
  if (!window.ethereum) {
    setTimeout(() => {
      alert("Please connect your wallet first");
    }, 5000);
    return "";
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  return signer;
};

// Details of campaign corresponding to address
export const fetchCampaignDetail = async (address) => {
  const contract = new ethers.Contract(address, CampaignJSON.abi, provider);
  try {
    const data = await contract.getDetails();
    return {
      address,
      manager: data[0],
      title: data[1],
      campaignDescription: data[2],
      image: data[3],
    };
  } catch (error) {
    console.log(error);
  }
};

// Get campaign addresses and corresponding details
export const fetchCampaigns = async () => {
  const contract = new ethers.Contract(
    FactoryJSON.address,
    FactoryJSON.abi,
    provider
  );
  try {
    let campaignAddresses = await contract.getCampaigns();
    let campaignDetails = [];

    for (let index = 0; index < campaignAddresses.length; index++) {
      const detail = await fetchCampaignDetail(campaignAddresses[index]);
      campaignDetails.push(detail);
    }

    return campaignDetails;
  } catch (error) {
    console.log(error);
  }
};

// Create campaign
export const createCampaign = async (props) => {
  const { buffer, minimumamount, title, description } = props;
  const signer = await fetchSignerForUpdation();
  if (!signer || !signer.length) return;
  let contract = new ethers.Contract(
    FactoryJSON.address,
    FactoryJSON.abi,
    signer
  );

  let data;
  if (buffer) data = await ipfs.add(buffer);

  try {
    let info = await contract.addCampaign(
      minimumamount,
      data?.path || "",
      title,
      description
    );
    info = await info.wait();
    if (info) return;
  } catch (error) {
    console.log(error);
  }
};
