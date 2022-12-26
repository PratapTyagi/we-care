import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { EthereumContext, ToasterContext } from "../contexts";
import { useCampaignMutation, useFetchCampaigns } from "../hooks/CampaignHook";
import WCForm from "../stories/WCForm/WCForm";

const CreateCampaignPage = () => {
  const { showToast } = useContext(ToasterContext);
  const { account } = useContext(EthereumContext);
  const [buffer, setBuffer] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const { refetch: refetchCampaigns } = useFetchCampaigns();
  const { createCampaign } = useCampaignMutation();
  const { mutate: createNewCampaign, isSuccess: createNewCampaignSuccess } =
    createCampaign;

  useEffect(() => {
    refetchCampaigns();
  }, [createNewCampaignSuccess, refetchCampaigns]);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (
      !values.title.length ||
      !values.description.length ||
      !values.amount.length
    )
      return showToast({
        type: "warning",
        message: "Must have correct amount, title, description",
      });

    createNewCampaign({ ...values, buffer });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // Making buffer type
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result);
      setBuffer(buffer);
    };
  };

  const inputs = [
    {
      name: "Title",
      value: "title",
      type: "text",
      onChange: (e) => setValues({ ...values, title: e.target.value }),
    },
    {
      name: "Description",
      value: "description",
      type: "text",
      onChange: (e) => setValues({ ...values, description: e.target.value }),
    },
    {
      name: "Amount In Wei",
      value: "amount",
      type: "text",
      onChange: (e) => setValues({ ...values, amount: e.target.value }),
    },
    {
      name: "Campaign Picture",
      value: "picture",
      accept: "image/* .jpg, .jpeg, .png, .bmp, .gif",
      type: "file",
      uploadTitle: "Upload your campaign picture",
      onChange: handleFileChange,
    },
  ];

  if (!account || !account.length)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        Please connect your account in order to access this page
      </Box>
    );

  return (
    <>
      <h2>Add campaign</h2>
      <Box display="flex" justifyContent="center" alignItems="center">
        <WCForm
          inputs={inputs}
          values={values}
          onSubmit={handleCreateCampaign}
        />
      </Box>
    </>
  );
};

export { CreateCampaignPage };
