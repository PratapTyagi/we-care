import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import { EthereumContext } from "../../contexts";
import FormDialog from "../FormDialog/FormDialog";

const useStyles = makeStyles({
  root: {
    backgroundColor: "initial",
  },
  title: {
    color: "var(--theame-color)",
  },
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

function ContributionCard(props) {
  const { account } = useContext(EthereumContext);
  const { campaignSummary } = props;
  const { onContribute } = props;
  const classes = useStyles();

  const [isContributionDialogOpen, setIsContributionDialogOpen] =
    useState(false);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" component="h2" className={classes.title}>
            Campaign Summary
          </Typography>
          <Typography variant="h5" component="h2">
            Balance:
          </Typography>
          <Typography color="textSecondary">
            {campaignSummary.balance} wei
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {campaignSummary.createdAt}
          </Typography>
          <Typography variant="h5" component="h2">
            Manager:
          </Typography>
          <Typography color="textSecondary">
            {campaignSummary.manager}
          </Typography>
          <Typography variant="h5" component="h2">
            Contributers Count:
          </Typography>
          <Typography color="textSecondary">
            {campaignSummary.contributersCount}
          </Typography>
          <Typography variant="h5" component="h2">
            Total Requests
          </Typography>
          <Typography color="textSecondary">
            {campaignSummary.totalRequests}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Please connect your account in order to contribute">
            <Button
              variant="contained"
              size="medium"
              className={
                !account.length ? classes.disabledBtn : classes.contributeBtn
              }
              onClick={
                !account.length ? null : () => setIsContributionDialogOpen(true)
              }
            >
              Proceed
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
      <FormDialog
        isOpen={isContributionDialogOpen}
        onClose={() => setIsContributionDialogOpen(false)}
        minimumContribution={campaignSummary.minimumContribution}
        onContribute={onContribute}
      />
    </>
  );
}

export default ContributionCard;
