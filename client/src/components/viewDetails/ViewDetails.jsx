import { useParams } from "react-router-dom";
import "./ViewDetails.css";

const ViewDetails = () => {
  const { address } = useParams();
  return <div className="viewDetails">view {address}</div>;
};

export default ViewDetails;
