import React from "react";
import { useParams } from "react-router-dom";
import { useFetchCampaignSummary } from "../hooks/CampaignHook";

const CampaignDetailsPage = () => {
  const { address } = useParams();
  const { data: campaignSummary, isLoading: campaignSummaryLoading } =
    useFetchCampaignSummary(address);

  if (campaignSummaryLoading) return <>Loading ...</>;

  console.log("campaignSummary", campaignSummary);
  return (
    <>
      {/* Campaign's info */}
      Campaign's info
      {/* Donation option */}
      Donation option
    </>
  );
};

export { CampaignDetailsPage };
