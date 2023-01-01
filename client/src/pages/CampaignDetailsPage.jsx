import React from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia, Typography } from "@material-ui/core";
import { useFetchCampaignSummary } from "../hooks/CampaignHook";
import { SummaryCard } from "../containers";

const CampaignDetailsPage = () => {
  const { address } = useParams();
  const { data: campaignSummary, isLoading: campaignSummaryLoading } =
    useFetchCampaignSummary(address);

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
            image={
              campaignSummary.image.length
                ? campaignSummary.image
                : "/images/startup.svg"
            }
            title={campaignSummary.title}
          />
        </Box>

        {/* Donation option */}
        <SummaryCard campaignSummary={campaignSummary} />
      </Box>
    </>
  );
};

export { CampaignDetailsPage };
