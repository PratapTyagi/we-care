import { useParams } from "react-router-dom";
import "./ViewDetails.css";

const ViewDetails = () => {
  const { address } = useParams();
  return (
    <div className="viewDetails">
      <div className="left">
        <h2>Campaigns information</h2>
        <div>
          <div className="card">
            <p>Total Balance</p>
            <p>1111</p>
          </div>
          <div className="card second">
            <p>Minimum Contribution</p>
            <p>100</p>
          </div>
        </div>
        <div>
          <div className="card">
            <p>Total requests</p>
            <p>0</p>
          </div>
          <div className="card second">
            <p>Contributers</p>
            <p>3000</p>
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
