import "./ViewRequests.css";
import { Link, useParams } from "react-router-dom";
import Campaign from "../../campaign";
import { useState, useEffect } from "react";
import web3 from "../../web3";

const ViewRequests = (props) => {
  const { address } = useParams();
  const [data, setData] = useState([]);
  const [totalApprovers, settotalApprovers] = useState(0);

  useEffect(() => {
    const getRequests = async () => {
      const campaign = Campaign(address);
      try {
        let newData = [];
        for (let i = 0; i < props.location.state; i++) {
          const request = await campaign.methods.requests(i).call();
          newData.push(request);
        }
        setData(newData);
      } catch (error) {
        alert(error);
      }
    };
    getRequests();
  }, [data]);

  useEffect(() => {
    const total = async () => {
      const campaign = Campaign(address);
      try {
        const count = await campaign.methods.contributorsCount().call();
        settotalApprovers(count);
      } catch (error) {
        alert(error);
      }
    };
    total();
  }, []);

  const approve = async (index) => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(index).send({
        from: accounts[0],
      });
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  const finalize = (e) => {
    e.preventDefault();
  };

  return (
    <div className="viewRequests">
      <h2>Requests</h2>
      <Link className="link" to={`/campaign/${address}/requests/addrequest`}>
        <button>Add request</button>
      </Link>
      <div className="viewRequests__inner">
        <table className="table table-borderless container">
          <thead className="table-active">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Recipient</th>
              <th scope="col">Approval Count</th>
              <th scope="col">Approve</th>
              <th scope="col">Finalize</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{value[0]}</td>
                  <td>{value[2]}</td>
                  <td>{value[1]}</td>
                  <td>
                    {value[4]}/{totalApprovers}
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        approve(index);
                      }}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button onClick={finalize}>Finalize</button>
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
