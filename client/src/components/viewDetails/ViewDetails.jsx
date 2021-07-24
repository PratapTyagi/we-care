import { Link, useParams } from "react-router-dom";
import "./ViewDetails.css";
import Campaign from "../../campaign.js";
import { useEffect, useState } from "react";
import web3 from "../../web3";

const ViewDetails = () => {
  const { address } = useParams();
  const [campaignSummary, setcampaignSummary] = useState({
    balance: "",
    minimumContribution: "",
    totalRequests: "",
    contributersCount: "",
    manager: "",
  });
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [account, setAccount] = useState("");

  // Current Account and is it contributor
  useEffect(() => {
    const accounts = async () => await web3.eth.getAccounts();
    accounts()
      .then((currAccount) => {
        setAccount(currAccount[0]);
        const campaign = Campaign(address);
        const contributorOrNot = async () =>
          await campaign.methods.isContributor(currAccount[0]).call();

        contributorOrNot()
          .then((data) => setIsContributor(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [isContributor, account]);

  // Current campaign info
  useEffect(() => {
    const campaign = Campaign(address);
    const t = async () => await campaign.methods.getSummary().call();
    t()
      .then((data) =>
        setcampaignSummary({
          balance: data[0],
          minimumContribution: parseInt(data[1]) + 1 + "",
          totalRequests: data[2],
          contributersCount: data[3],
          manager: data[4],
        })
      )
      .catch((err) => console.log(err));
  }, [campaignSummary]);

  const contribute = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    try {
      setLoading(true);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: value,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

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
            <p>{parseInt(campaignSummary.balance) + 1} wei</p>
          </div>
          <div className="card second">
            <p>Minimum Contribution</p>
            <p>{campaignSummary.minimumContribution} wei</p>
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
        {isContributor || campaignSummary.manager === account ? (
          <Link
            className="link"
            to={{
              pathname: `/campaign/${address}/requests`,
              state: {
                totalRequests: parseInt(campaignSummary.totalRequests),
                manager: campaignSummary.manager,
                isContributor: isContributor,
              },
            }}
          >
            <button>View Requests</button>
          </Link>
        ) : null}
      </div>
      <div className="right">
        <h2>Contribute To Campaign</h2>
        <label>* in wei</label>
        <input
          type="text"
          placeholder={`Minimum ${campaignSummary.minimumContribution} wei`}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        {loading && <p className="loading"></p>}
        <button onClick={contribute}>Contribute</button>
      </div>
    </div>
  );
};

export default ViewDetails;
