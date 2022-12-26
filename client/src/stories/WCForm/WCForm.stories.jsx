import React, { useEffect, useState } from "react";
import WCForm from "./WCForm";

export default {
  title: "Components/WCForm",
  component: WCForm,
};

export const Default = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const [buffer, setBuffer] = useState("");

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

  return <WCForm values={values} inputs={inputs} />;
};
