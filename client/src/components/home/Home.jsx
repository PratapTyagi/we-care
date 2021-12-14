import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FactoryJSON from "../../abi/Factory.json";
import { ethers } from "ethers";
import Card from "../card/Card";
import "./Home.css";

const Home = () => {
  const [addresses, setAddresses] = useState([]);

  const getCampaign = async () => {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      let contract = new ethers.Contract(
        FactoryJSON.address,
        FactoryJSON.abi,
        signer
      );
      try {
        let campaignAddress = await contract.getCampaigns();
        setAddresses(campaignAddress);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCampaign();
  }, []);

  return (
    <div className="home">
      <div className="left">
        <h2>Start Ups</h2>
        {addresses.map((address) => (
          <Card address={address} />
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
