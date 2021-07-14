import React, { useState } from "react";
import "./NewCampaign.css";
import factory from "../../factory";
import web3 from "../../web3";

const NewCampaign = () => {
  const [minimumamount, setMinimumAmount] = useState("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.addCampaign(minimumamount).send({
        from: accounts[0],
        gas: "1000000",
      });
    } catch ({ message }) {
      alert(message);
    }
    setloading(false);
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
            value={minimumamount}
            onChange={(e) => setMinimumAmount(e.target.value)}
          />
          <button type="submit">Create</button>
          {loading && <p className="loading"></p>}
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
