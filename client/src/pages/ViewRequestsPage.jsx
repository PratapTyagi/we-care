import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDialog } from "../components";
import { RequestsTable } from "../containers";
import { EthereumContext } from "../contexts";
import {
  createRequest,
  fetchIsContributor,
  fetchRequestsInfo,
} from "../helpers/functions";
import { useFetchCampaignSummary } from "../hooks/CampaignHook";
import { WCButton } from "../stories";

const ViewRequestsPage = () => {
  const { address } = useParams();
  const { account } = useContext(EthereumContext);
  const [isContributor, setIsContributor] = useState(false);
  const [data, setData] = useState([]);

  const [requestInfo, setRequestInfo] = useState({
    description: "",
    amount: "",
    recepient: "",
  });
  const [isAddRequestDialogOpen, setIsAddRequestDialogOpen] = useState(false);

  // Current campaign info
  const { data: campaignSummary, isLoading: campaignSummaryLoading } =
    useFetchCampaignSummary(address);

  // Current Account and is it contributor
  useEffect(() => {
    if (address && account)
      fetchIsContributor(address, account)
        .then((res) => {
          setIsContributor(res);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
  }, [address, account]);

  // Request's information
  useEffect(() => {
    if (address.length > 0 && campaignSummary) {
      fetchRequestsInfo({
        address,
        totalRequests: campaignSummary.totalRequests,
      })
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }, [campaignSummary, address]);

  const handleAddRequest = ({ description, amount, recepient }) => {
    if (description === "" || amount === "" || recepient === "")
      return alert("Empty inputs");
    createRequest({
      address,
      description,
      amount,
      recepient,
      callbackFn: () => setIsAddRequestDialogOpen(false),
    });
  };

  const inputs = [
    {
      label: "Description",
      value: requestInfo.description,
      onChange: (e) =>
        setRequestInfo({ ...requestInfo, description: e.target.value }),
    },
    {
      label: "Amount required",
      value: requestInfo.amount,
      onChange: (e) =>
        setRequestInfo({ ...requestInfo, amount: e.target.value }),
    },
    {
      label: "Receipient",
      value: requestInfo.recepient,
      onChange: (e) =>
        setRequestInfo({ ...requestInfo, recepient: e.target.value }),
    },
  ];

  if (account.length <= 0) return <>Please connect your wallet first</>;
  if (campaignSummaryLoading) return <>Loading ...</>;
  return (
    <div>
      <h2>Requests</h2>
      {campaignSummary.manager === account && (
        <WCButton
          label="Add request"
          onClick={() => setIsAddRequestDialogOpen(true)}
        />
      )}
      <RequestsTable
        campaignSummary={campaignSummary}
        isContributor={isContributor}
        data={data}
      />
      <FormDialog
        isOpen={isAddRequestDialogOpen}
        onClose={() => setIsAddRequestDialogOpen(false)}
        title="Add Request"
        inputs={inputs}
        onSubmit={() => handleAddRequest(requestInfo)}
      />
    </div>
  );
};

export { ViewRequestsPage };
