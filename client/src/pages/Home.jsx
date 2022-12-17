import React, { useEffect, useState } from "react";
import { Box, Card } from "@material-ui/core";
import { fetchCampaigns } from "../helpers";

const Home = () => {
  const [campaignDetails, setCampaignDetails] = useState([]);

  const handleCampaignInfo = async () => {
    try {
      setCampaignDetails(await fetchCampaigns());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCampaignInfo();
  }, []);

  return (
    <Box>
      {/* Card */}
      <>
        <h2>Start Ups</h2>
        {campaignDetails.map((details) => (
          <Card key={details.address} details={details} />
        ))}
      </>
      {/* Video section */}
    </Box>
  );
};

export { Home };
