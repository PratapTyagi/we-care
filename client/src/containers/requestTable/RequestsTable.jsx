import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { EthereumContext } from "../../contexts";
import { approveRequest, finalizeRequest } from "../../helpers/functions";

const RequestsTable = (props) => {
  const { campaignSummary, isContributor, data } = props;
  const { address } = useParams();
  const { account } = useContext(EthereumContext);

  // Approve request
  const handleApprove = (index) => {
    approveRequest({ address, index });
  };

  // Finalize request
  const handleFinalize = (index) => {
    finalizeRequest({ address, index });
  };

  return (
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
            {campaignSummary.manager === account ? (
              <th scope="col">Finalize</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((value, index) => {
              console.log("VALUE ==> ", value);
              return (
                <tr
                  key={index}
                  className={`${value.compleate ? "dim" : ""} ${
                    value.approvalsCount + 1 >
                      campaignSummary.contributersCount / 2 && !value.compleate
                      ? "readyToFinalize"
                      : ""
                  }`}
                >
                  <td>{index}</td>
                  <td>{value[0]}</td>
                  <td>{value[2]}</td>
                  <td>{value[1]}</td>
                  <td>
                    {value[4]}/{campaignSummary.contributersCount}
                  </td>
                  {!value.compleate && isContributor ? (
                    <td>
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleApprove(index);
                        }}
                      >
                        Approve
                      </button>
                    </td>
                  ) : null}
                  {!value.compleate && campaignSummary.manager === account ? (
                    <td>
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFinalize(index);
                        }}
                      >
                        Finalize
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { RequestsTable };
