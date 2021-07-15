import { useParams } from "react-router-dom";
import "./ViewDetails.css";
import Campaign from "../../campaign.js";
import { useEffect, useState } from "react";

const ViewDetails = () => {
  const { address } = useParams();
  const [campaignSummary, setcampaignSummary] = useState({
    balance: "",
    minimumContribution: "",
    totalRequests: "",
    contributersCount: "",
    manager: "",
  });

  useEffect(() => {
    const campaign = Campaign(address);
    const t = async () => await campaign.methods.getSummary().call();
    t()
      .then((data) =>
        setcampaignSummary({
          balance: data[0],
          minimumContribution: data[1],
          totalRequests: data[2],
          contributersCount: data[3],
          manager: data[4],
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="viewDetails">
      <div className="left">
        <h2>Campaigns information</h2>
        <div>
          <div className="card first">
            <p>Manager</p>
            <p>{campaignSummary.manager}</p>
            <p>This is address of manager of this startup campaign</p>
          </div>
        </div>
        <div className="left__bottom">
          <div className="card">
            <p>Total Balance</p>
            <p>{campaignSummary.balance}</p>
          </div>
          <div className="card second">
            <p>Minimum Contribution</p>
            <p>{campaignSummary.minimumContribution}</p>
          </div>
        </div>
        <div className="left__bottom">
          <div className="card">
            <p>Total requests</p>
            <p>{campaignSummary.totalRequests}</p>
          </div>
          <div className="card second">
            <p>Contributers</p>
            <p>{campaignSummary.contributersCount}</p>
          </div>
        </div>
        <button>View Requests</button>
      </div>
      <div className="right">
        <h2>Contribute To Campaign</h2>
        <input type="text" value="100" />
        <button>Contribute</button>
      </div>
    </div>
  );
};

export default ViewDetails;
