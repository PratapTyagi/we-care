import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import factory from "../../factory.js";

import "./Home.css";
const Home = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const t = async () => await factory.methods.getCampaigns().call();
    t()
      .then((data) => setAddresses(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home">
      <div className="left">
        {addresses.map((address) => (
          <>
            <div className="home__card">
              <p>{address}</p>
              <button>View Details</button>
            </div>
            <div className="home__card">
              <p>{address}</p>
              <button>View Details</button>
            </div>
          </>
        ))}
      </div>
      <div className="right">
        <Link to="/campaign/new" style={{ textDecoration: "none" }}>
          <button>Create Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
