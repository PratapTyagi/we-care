import React, { useState } from "react";
import {
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    margin: "0 auto",
    color: "white !important",
    backgroundColor: "var(--theame-color) !important",
  },
});
function FormDialog(props) {
  const { isOpen, minimumContribution } = props;
  const { onClose, onContribute } = props;
  const classes = useStyles();

  const [amount, setAmount] = useState("");

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Contribute</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To contribute please enter the amount in wei
          <br />
          <strong>Note: </strong>
          Contributions must be greater than {minimumContribution} wei
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Amount"
          type="text"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={classes.button}>
          Cancel
        </Button>
        <Button onClick={() => onContribute(amount)} className={classes.button}>
          Contribute
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
