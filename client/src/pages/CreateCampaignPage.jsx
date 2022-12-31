import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { EthereumContext, ToasterContext } from "../contexts";
import { useCampaignMutation, useFetchCampaigns } from "../hooks/CampaignHook";
import WCForm from "../stories/WCForm/WCForm";

const CreateCampaignPage = () => {
  const { showToast } = useContext(ToasterContext);
  const { account } = useContext(EthereumContext);
  const [file, setFile] = useState("");
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

  const handleFileUploadProgress = (e) => {
    console.log("File Uploading ...");
    console.log(e.loaded / e.total);
  };

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

    createNewCampaign({
      ...values,
      file,
      onUploadProgress: handleFileUploadProgress,
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
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
