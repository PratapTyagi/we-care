import { useState } from "react";
import "./Card.css";

import Campaign from "../../campaign.js";
import { Link } from "react-router-dom";

const Card = ({ address }) => {
  const [campaignDetails, setCampaignDetails] = useState({});
  const [open, setOpen] = useState(true);

  const getInfo = async () => {
    setOpen(false);
    const campaign = Campaign(address);
    const t = await campaign.methods.getDetails().call();
    setCampaignDetails({
      manager: t[0],
      title: t[1],
      campaignDescription: t[2],
      image: t[3],
    });
  };

  return (
    <div className="home__card">
      <p>{address}</p>
      {open ? (
        <button onClick={getInfo}>Get Info</button>
      ) : (
        <div className="home__card__bottom">
          {campaignDetails.image ? (
            <img
              src={`https://ipfs.infura.io/ipfs/${campaignDetails.image}`}
              alt="Campaign image"
            />
          ) : null}
          <div className="home__card__info">
            <h5>Title: {campaignDetails.title}</h5>
            <h5>Reason: {campaignDetails.campaignDescription}</h5>
            <p>Manager: {campaignDetails.manager}</p>
          </div>
          <div className="bottom">
            <Link
              to={`/campaign/${address}`}
              style={{
                textDecoration: "none",
                color: "initial",
                marginRight: "10px",
              }}
            >
              <button>View Details</button>
            </Link>
            <button onClick={() => setOpen(true)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
