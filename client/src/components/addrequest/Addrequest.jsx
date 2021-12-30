import { useState } from "react";
import CampaignJSON from "../../abi/Campaign.json";
import { ethers } from "ethers";
import { useHistory, useParams } from "react-router-dom";

import "./Addrequest.css";
const Addrequest = () => {
  const history = useHistory();
  const [formInfo, setFormInfo] = useState({
    description: "",
    value: "",
    recepient: "",
  });
  const { address } = useParams();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      formInfo.description === "" ||
      formInfo.value === "" ||
      formInfo.recepient === ""
    )
      return alert("Empty inputs");

    if (typeof window.ethereum == undefined) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    try {
      const info = await campaign.createRequest(
        formInfo.description,
        formInfo.value,
        formInfo.recepient
      );
      const temp = await info.wait();
      if (temp) history.push(`/campaign/${address}/requests`);
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };
  return (
    <div className="addRequest">
      <h2>Add Request</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Description"
          defaultValue={formInfo.description}
          onChange={(e) =>
            setFormInfo({ ...formInfo, description: e.target.value })
          }
        />
        <input
          type=""
          placeholder="Amount required"
          defaultValue={formInfo.value}
          onChange={(e) => setFormInfo({ ...formInfo, value: e.target.value })}
        />
        <input
          type="text"
          placeholder="Receipient"
          defaultValue={formInfo.recepient}
          onChange={(e) =>
            setFormInfo({ ...formInfo, recepient: e.target.value })
          }
        />
        <button type="submit">Add Request</button>
      </form>
    </div>
  );
};

export default Addrequest;
