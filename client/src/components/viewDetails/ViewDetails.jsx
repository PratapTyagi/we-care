import { Link, useParams } from "react-router-dom";
import "./ViewDetails.css";
import CampaignJSON from "../../abi/Campaign.json";
import { ethers } from "ethers";
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
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [account, setAccount] = useState("");

  // Current Account and is it contributor
  useEffect(async () => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const account = localStorage.getItem("accounts");
    setAccount(account);
    if (!account) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    setIsContributor(await campaign.isContributor(account));
  }, [isContributor, account, campaignSummary]);

  // Current campaign info
  useEffect(async () => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
    const campaign = new ethers.Contract(address, CampaignJSON.abi, provider);
    try {
      const data = await campaign.getSummary();
      setcampaignSummary({
        balance: parseInt(data[0].toString()) / Math.pow(10, 18) - 1,
        minimumContribution: parseInt(data[1].toString()) + "",
        totalRequests: data[2].toString(),
        contributersCount: data[3].toString(),
        manager: data[4],
      });
    } catch (error) {
      console.log(error.message || "Something went wrong");
    }
  }, [campaignSummary]);

  const contribute = async (e) => {
    e.preventDefault();
    if (!value) {
      return alert("Put some ethers value");
    }
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      let contract = new ethers.Contract(address, CampaignJSON.abi, signer);
      try {
        setLoading(true);
        const info = await contract.contribute({
          value: ethers.utils.parseEther(value),
        });
        await info.wait();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
            <p>Min. Contribution</p>
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
          <Link className="link" to={`/campaign/${address}/requests`}>
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
          defaultValue={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        {loading && <p className="loading"></p>}
        <button onClick={contribute}>Contribute</button>
      </div>
    </div>
  );
};

export default ViewDetails;
