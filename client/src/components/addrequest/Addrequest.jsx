import { useState } from "react";
import web3 from "../../web3.js";
import Campaign from "../../campaign";
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

    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    try {
      await campaign.methods
        .createRequest(formInfo.description, formInfo.value, formInfo.recepient)
        .send({
          from: accounts[0],
          gas: "1000000",
        });
      history.push(`/campaign/${address}/requests`);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="addRequest">
      <h2>Add Request</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={formInfo.description}
          onChange={(e) =>
            setFormInfo({ ...formInfo, description: e.target.value })
          }
        />
        <input
          type=""
          placeholder="Amount required"
          value={formInfo.value}
          onChange={(e) => setFormInfo({ ...formInfo, value: e.target.value })}
        />
        <input
          type="text"
          placeholder="Receipient"
          value={formInfo.recepient}
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
