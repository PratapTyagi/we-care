import "./ViewRequests.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CampaignJSON from "../../abi/Campaign.json";

const ViewRequests = () => {
  const { address } = useParams();
  const [data, setData] = useState([]);
  const [totalApprovers, settotalApprovers] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [isContributor, setIsContributor] = useState(false);
  const [campaignSummary, setcampaignSummary] = useState({
    totalRequests: "",
    manager: "",
  });

  // Current Account and is it contributor
  useEffect(async () => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    setIsContributor(await campaign.isContributor(accounts[0]));
  }, [isContributor]);

  // Current campaign info
  useEffect(async () => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
    const campaign = new ethers.Contract(address, CampaignJSON.abi, provider);
    const data = await campaign.getSummary();
    setcampaignSummary({
      totalRequests: data[2].toString(),
      manager: data[4].toLowerCase(),
    });
  }, []);

  // Request's data
  useEffect(async () => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
    const campaign = new ethers.Contract(address, CampaignJSON.abi, provider);
    try {
      let newData = [];
      for (let i = 0; i < campaignSummary.totalRequests; i++) {
        let request = await campaign.requests(i);
        request = {
          ...request,
          2: request[2].toString(),
          4: request[4].toString(),
        };
        newData.push(request);
      }
      setData(newData);
    } catch (error) {
      alert(error);
    }
  }, [campaignSummary]);

  // Contributors count
  useEffect(async () => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    try {
      const count = await campaign.contributorsCount();
      settotalApprovers(count.toString());
    } catch (error) {
      alert(error);
    }
  }, [totalApprovers]);

  useEffect(async () => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentUser(accounts[0].toLowerCase());
  }, []);

  const approve = async (index) => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    try {
      let info = await campaign.approveRequest(index);
      await info.wait();

      // Updating number of approvals
      let dataArray = [...data];
      let dataAtRequestIndex = { ...dataArray[index] };
      dataAtRequestIndex[4] = parseInt(data[index][4]) + 1;
      dataArray[index] = dataAtRequestIndex;
      setData(dataArray);
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  const finalize = async (index) => {
    if (typeof window.ethereum == undefined) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const campaign = new ethers.Contract(address, CampaignJSON.abi, signer);
    try {
      await campaign.finalizeRequest(index);
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="viewRequests">
      <h2>Requests</h2>
      {campaignSummary.manager === currentUser ? (
        <Link className="link" to={`/campaign/${address}/requests/addrequest`}>
          <button>Add request</button>
        </Link>
      ) : null}
      <div className="viewRequests__inner">
        <table className="table table-borderless table-hover container">
          <thead className="table-active">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Recipient</th>
              <th scope="col">Approval Count</th>
              {isContributor ? <th scope="col">Approve</th> : null}
              {campaignSummary.manager === currentUser ? (
                <th scope="col">Finalize</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => (
                <tr
                  key={index}
                  className={`${value.compleate ? "dim" : ""} ${
                    value.approvalsCount + 1 > totalApprovers / 2 &&
                    !value.compleate
                      ? "readyToFinalize"
                      : ""
                  }`}
                >
                  <td>{index}</td>
                  <td>{value[0]}</td>
                  <td>{value[2]}</td>
                  <td>{value[1]}</td>
                  <td>
                    {value[4]}/{totalApprovers}
                  </td>
                  <td>
                    {!value.compleate && isContributor ? (
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          approve(index);
                        }}
                      >
                        Approve
                      </button>
                    ) : null}
                  </td>
                  <td>
                    {!value.compleate &&
                    campaignSummary.manager === currentUser ? (
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          finalize(index);
                        }}
                      >
                        Finalize
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRequests;
