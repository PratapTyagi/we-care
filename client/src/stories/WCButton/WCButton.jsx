import React from "react";
import { Button } from "@material-ui/core";

const WCButton = ({ label, children, ...props }) => {
  return (
    <Button {...props}>
      {label}
      {children}
    </Button>
  );
};

WCButton.defaultProps = {
  color: "primary",
  component: undefined,
  disabled: false,
  endIcon: undefined,
  label: "Label",
  size: "medium",
  startIcon: undefined,
};

export default WCButton;
