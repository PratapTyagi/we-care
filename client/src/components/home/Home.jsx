import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import factory from "../../factory.js";

import Card from "../card/Card";
import "./Home.css";

const Home = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const t = async () => await factory.methods.getCampaigns().call();
    t()
      .then((data) => {
        setAddresses(data);
      })
      .catch((err) => console.log(err));
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
