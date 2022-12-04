import React from "react";
import { Delete as DeleteIcon } from "@material-ui/icons";
import WCButton from "./WCButton";

export default {
  title: "Components/WCButton",
  component: WCButton,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "radio" },
      options: ["text", "contained", "outlined"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "radio" },
      options: [true, false],
    },
    color: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
};

const Template = (args) => <WCButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "contained",
  label: "Create Workspace",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "contained",
  label: "Create Workspace",
  disabled: true,
};

export const StartIcon = Template.bind({});
StartIcon.args = {
  variant: "contained",
  label: "Delete",
  startIcon: <DeleteIcon />,
};

export const EndIcon = Template.bind({});
EndIcon.args = {
  variant: "contained",
  label: "Delete",
  endIcon: <DeleteIcon />,
};

export const Upload = Template.bind({});
Upload.args = {
  variant: "contained",
  label: "Upload",
  component: "label",
  children: <input hidden accept="image/*" multiple type="file" />,
};

export const Link = Template.bind({});
Link.args = {
  variant: "contained",
  label: "Link",
  href: "#outlined-buttons",
};
