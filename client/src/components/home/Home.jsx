import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import factory from "../../factory.js";
import Campaign from "../../campaign.js";

import "./Home.css";
const Home = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const t = async () => await factory.methods.getCampaigns().call();
    t()
      .then((data) => setAddresses(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    addresses.forEach((e) => {
      const campaign = Campaign(e);
      const t = async () => await campaign.methods.getDetails().call();
      t()
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
    });
  }, [addresses]);

  return (
    <div className="home">
      <div className="left">
        <h2>Start Ups</h2>
        {addresses.map((address) => (
          <>
            <div className="home__card" key={address}>
              <p>{address}</p>
              <Link to={`/campaign/${address}`}>
                <button>View Details</button>
              </Link>
            </div>
          </>
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
