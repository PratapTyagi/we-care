import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FactoryJSON from "../../abi/Factory.json";
import CampaignJSON from "../../abi/Campaign.json";
import { ethers } from "ethers";
import Card from "../card/Card";
import "./Home.css";

const Home = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);

  // Details of campaign corresponding to address
  const singleCampaignDetail = async (address) => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
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

  // Get Campaign addresses
  const getCampaignAddresses = async () => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
    let contract = new ethers.Contract(
      FactoryJSON.address,
      FactoryJSON.abi,
      provider
    );
    try {
      let campaignAddress = await contract.getCampaigns();
      for (let index = 0; index < campaignAddress.length; index++) {
        const detail = await singleCampaignDetail(campaignAddress[index]);
        setCampaignDetails((prevItem) => [...prevItem, detail]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaignAddresses();
  }, []);

  return (
    <div className="home">
      <div className="left">
        <h2>Start Ups</h2>
        {campaignDetails.map((details) => (
          <Card key={details.address} details={details} />
        ))}
      </div>
      <div className="right">
        <Link to="/campaigns/new" style={{ textDecoration: "none" }}>
          <button>Create Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
