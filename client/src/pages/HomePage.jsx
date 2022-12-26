import React from "react";
import { Box, Container } from "@material-ui/core";
import { WCCard } from "../stories";
import { useFetchCampaigns } from "../hooks/CampaignHook";

const Home = () => {
  const { data: campaigns, isLoading: campaignsLoading } = useFetchCampaigns();
  if (campaignsLoading) return <>Loading...</>;

  return (
    <Container fixed maxWidth="lg">
      {/* Card */}
      <h2>Start Ups</h2>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        pt={3}
        pb={2}
      >
        {campaigns &&
          campaigns.map((campaign) => (
            <WCCard
              key={campaign.address}
              description={campaign.campaignDescription}
              title={campaign.title}
              imageSrc={campaign.image || ""}
              createdAt={campaign.createdAt}
            />
          ))}
      </Box>
      {/* Video section */}
      <Box flex={3}></Box>
    </Container>
  );
};

export { Home };
