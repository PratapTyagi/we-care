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
  const { isOpen, title, description, inputs } = props;
  const { onClose, onSubmit } = props;
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {inputs.length > 0 &&
          inputs.map((input) => {
            return (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                key={input.label}
                label={input.label}
                value={input.value}
                onChange={input.onChange}
              />
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={classes.button}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className={classes.button}>
          {title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
