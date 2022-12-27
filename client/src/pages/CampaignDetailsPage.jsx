import React from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia, Typography } from "@material-ui/core";
import { ContributionCard } from "../components";
import {
  useCampaignMutation,
  useFetchCampaignSummary,
} from "../hooks/CampaignHook";

const CampaignDetailsPage = () => {
  const { address } = useParams();
  const { data: campaignSummary, isLoading: campaignSummaryLoading } =
    useFetchCampaignSummary(address);

  const { makeContribution } = useCampaignMutation();
  const { mutate: contribute } = makeContribution;

  const handleContribution = (amount) => {
    contribute({ address, amount });
  };

  if (campaignSummaryLoading) return <>Loading ...</>;

  return (
    <>
      {/* Campaign's header */}
      <Box>
        <Typography gutterBottom variant="h4" component="h1">
          {campaignSummary.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {campaignSummary.campaignDescription}
        </Typography>
      </Box>
      <Box display="flex">
        {/* Related Images */}
        <Box
          style={{
            marginLeft: "2em",
            marginRight: "2em",
          }}
        >
          <CardMedia
            style={{
              paddingTop: "55.5%",
              width: "55vw",
            }}
            image="/images/dizzy-programmer-writes-code-on-a-laptop_adobe_express.svg"
            title={campaignSummary.title}
          />
        </Box>

        {/* Donation option */}
        <ContributionCard
          campaignSummary={campaignSummary}
          onContribute={handleContribution}
        />
      </Box>
    </>
  );
};

export { CampaignDetailsPage };
