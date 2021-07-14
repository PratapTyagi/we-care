import React, { useState } from "react";
import "./NewCampaign.css";
const NewCampaign = () => {
  const [amount, setAmount] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="newCampaign">
      <h2>Add campaign</h2>
      <div className="newCampaign__container">
        <form onSubmit={onSubmit}>
          <p>*in wei</p>
          <input
            type="text"
            placeholder="Enter minimum amount of wei"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
