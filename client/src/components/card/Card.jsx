import { useState } from "react";
import "./Card.css";

import Campaign from "../../campaign.js";
import { Link } from "react-router-dom";

const Card = ({ details }) => {
  return (
    <div className="home__card">
      <h5>{details?.title}</h5>

      <div className="home__card__bottom">
        {details?.image ? (
          <img
            src={`https://ipfs.infura.io/ipfs/${details?.image}`}
            alt="Campaign image"
          />
        ) : null}
        <div className="home__card__info">
          <h5>Reason: {details?.campaignDescription}</h5>
          <p>Address: {details?.address}</p>
          <p>Manager: {details?.manager}</p>
        </div>
        <div className="bottom">
          <Link
            to={`/campaign/${details?.address}`}
            style={{
              textDecoration: "none",
              color: "initial",
              marginRight: "10px",
            }}
          >
            <button>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
