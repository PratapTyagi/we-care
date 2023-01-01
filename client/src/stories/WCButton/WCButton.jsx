import React from "react";
import { Button, makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  contributeBtn: {
    margin: "0 auto",
    color: "white !important",
    backgroundColor: "var(--theame-color) !important",
  },
  disabledBtn: {
    margin: "0 auto",
    color: "white !important",
    backgroundColor: "grey",
    cursor: "text !important",
  },
});
const WCButton = ({ label, children, disabled, ...props }) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={disabled ? `Please connect your account in order to ${label}` : ""}
    >
      <Button
        {...props}
        className={disabled ? classes.disabledBtn : classes.contributeBtn}
      >
        {label}
        {children}
      </Button>
    </Tooltip>
  );
};

WCButton.defaultProps = {
  disabled: false,
  endIcon: undefined,
  label: "Label",
  size: "medium",
  startIcon: undefined,
};

export default WCButton;
