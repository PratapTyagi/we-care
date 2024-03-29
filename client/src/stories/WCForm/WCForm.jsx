import React from "react";
import clsx from "clsx";
import { makeStyles, Input, Button, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "35ch",
  },
  input: {
    lineHeight: "3em",
  },
}));

const WCForm = (props) => {
  const classes = useStyles();
  const { values, inputs, onSubmit } = props;

  return (
    <form
      className={clsx(
        classes.margin,
        classes.withoutLabel,
        classes.textField,
        classes.input
      )}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {inputs.length &&
        inputs.map((input) => {
          const { type, value, onChange, name, ...rest } = input;

          return (
            <React.Fragment key={input.value}>
              {type === "file" ? (
                <>
                  <br />
                  <input
                    id={value}
                    type={type}
                    onChange={onChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={value}>
                    <Tooltip title={rest.uploadTitle}>
                      <Button id={value} variant="text" component="span">
                        Upload
                      </Button>
                    </Tooltip>
                  </label>
                </>
              ) : (
                <Input
                  type={type}
                  onChange={onChange}
                  placeholder={name}
                  id={value}
                  {...(type !== "file" ? { value: values[value] } : {})}
                  {...rest}
                />
              )}
            </React.Fragment>
          );
        })}
      <br />
      <Button type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default WCForm;
