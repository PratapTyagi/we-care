import FactoryJSON from "../abi/Factory.json";
import CampaignJSON from "../abi/Campaign.json";
import { ethers } from "ethers";
import { uploadMedia } from "../utils";
// import { ipfs } from "../utils";

const CLOUDINARY_URL = `https://res.cloudinary.com`;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

// Provider toggle on change of environment
const provider =
  process.env.REACT_APP_ENVIRONMENT === "localhost"
    ? new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545")
    : new ethers.providers.InfuraProvider("goerli");

const dateConversion = (date) => {
  const newDate = new Date(date.toNumber() * 1000);
  return newDate.toLocaleDateString() + "";
};

// For updating, metamask interaction is neccessory for any client
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

    let image;
    if (data[3].length)
      image = `${CLOUDINARY_URL}/${CLOUD_NAME}/image/upload/w_200,h_100,c_fill,q_100/${data[3]}.jpg`;

    return {
      address,
      title: data[1],
      campaignDescription: data[2],
      image: image || "",
      createdAt: dateConversion(data[4]),
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
export const createNewCampaign = async (props) => {
  const { amount, title, description, file, onUploadProgress } = props;
  const signer = await fetchSignerForUpdation();
  if (!Object.entries(signer).length) return;
  let contract = new ethers.Contract(
    FactoryJSON.address,
    FactoryJSON.abi,
    signer
  );
  let data;
  // if (buffer) data = await ipfs.add(buffer);
  if (file) data = await uploadMedia({ file, onUploadProgress });

  try {
    let info = await contract.addCampaign(
      amount,
      // data?.path || "",
      data?.public_id || "",
      title,
      description
    );
    await info.wait();
  } catch (error) {
    console.log(error);
  }
};

// Fetch campaign summary
export const fetchCampaignSummary = async (address) => {
  const campaign = new ethers.Contract(address, CampaignJSON.abi, provider);
  try {
    const data = await campaign.getSummary();
    const campaignSummary = await fetchCampaignDetail(address);
    return {
      address,
      balance: ethers.utils.formatUnits(data[0], "wei"),
      minimumContribution: ethers.utils.formatUnits(data[1], "wei"),
      totalRequests: data[2].toString(),
      contributersCount: data[3].toString(),
      manager: data[4].toLowerCase(),
      ...campaignSummary,
    };
  } catch (error) {
    console.log(error.message || "Something went wrong");
  }
};

// Function for user to make a contribution in a campaign
export const contributeAmount = async (address, amount, callbackFn) => {
  const signer = await fetchSignerForUpdation();
  if (!Object.entries(signer).length) return;
  const contract = new ethers.Contract(address, CampaignJSON.abi, signer);
  try {
    const info = await contract.contribute({
      value: amount,
    });
    await info.wait();
    callbackFn();
  } catch (error) {
    console.log(error);
  }
};

// Fetch if account is contributor to current campaign
export const fetchIsContributor = async (address, account) => {
  const contract = new ethers.Contract(address, CampaignJSON.abi, provider);
  return await contract.isContributor(account);
};

// Startup owner creates request for spending funds
export const createRequest = async ({
  address,
  description,
  amount,
  recepient,
  callbackFn,
}) => {
  const signer = await fetchSignerForUpdation();
  if (!Object.entries(signer).length) return;
  const contract = new ethers.Contract(address, CampaignJSON.abi, signer);

  try {
    const info = await contract.createRequest(description, amount, recepient);
    const temp = await info.wait();
    if (temp) callbackFn();
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

export const fetchRequestsInfo = async ({ address, totalRequests }) => {
  const contract = new ethers.Contract(address, CampaignJSON.abi, provider);

  try {
    let newData = [];
    for (let i = 0; i < totalRequests; i++) {
      let request = await contract.requests(i);
      request = {
        ...request,
        2: request[2].toString(),
        4: request[4].toString(),
      };
      newData.push(request);
    }
    return newData;
  } catch (error) {
    alert(error);
  }
};

// Approve request of campaign
export const approveRequest = async ({ address, index }) => {
  const signer = await fetchSignerForUpdation();
  if (!Object.entries(signer).length) return;
  const contract = new ethers.Contract(address, CampaignJSON.abi, signer);

  try {
    let info = await contract.approveRequest(index);
    await info.wait();
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

// Finalize request of campaign
export const finalizeRequest = async ({ address, index }) => {
  const signer = await fetchSignerForUpdation();
  if (!Object.entries(signer).length) return;
  const contract = new ethers.Contract(address, CampaignJSON.abi, signer);
  try {
    await contract.finalizeRequest(index);
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};
