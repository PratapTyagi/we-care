import React, { useState } from "react";
import "./NewCampaign.css";
import FactoryJSON from "../../abi/Factory.json";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const NewCampaign = () => {
  const [minimumamount, setMinimumAmount] = useState("");
  const [loading, setloading] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // Making buffer type
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result);
      setBuffer(buffer);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !buffer || !minimumamount)
      return alert(
        "Must have correct image source, amount, title, description"
      );

    setloading(true);
    if (window.ethereum !== undefined) {
      const data = await ipfs.add(buffer);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      let contract = new ethers.Contract(
        FactoryJSON.address,
        FactoryJSON.abi,
        signer
      );
      try {
        const info = await contract.addCampaign(
          minimumamount,
          data.path,
          title,
          description
        );
        console.log(info);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
    setloading(false);
  };

  return (
    <div className="newCampaign">
      <h2>Add campaign</h2>
      <div className="newCampaign__container">
        <form onSubmit={onSubmit}>
          <div className="container">
            <div className="button-wrap">
              <label className="button" htmlFor="upload">
                Campaign Pic
              </label>
              <input
                id="upload"
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif"
                onChange={onFileChange}
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount In Wei"
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
