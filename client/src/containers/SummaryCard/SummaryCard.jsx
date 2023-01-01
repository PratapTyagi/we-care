import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { EthereumContext } from "../../contexts";
import { WCButton } from "../../stories/";
import { useHistory, useParams } from "react-router-dom";
import { FormDialog } from "../../components";
import { fetchIsContributor } from "../../helpers/functions";

const useStyles = makeStyles({
  root: {
    backgroundColor: "initial",
  },
  title: {
    color: "var(--theame-color)",
  },
});

function SummaryCard(props) {
  const { address } = useParams();
  const { account } = useContext(EthereumContext);
  const history = useHistory();
  const { campaignSummary, onContribute } = props;
  const classes = useStyles();

  const [isContributionDialogOpen, setIsContributionDialogOpen] =
    useState(false);
  const [isContributor, setIsContributor] = useState(false);

  useEffect(() => {
    if (address && account)
      fetchIsContributor(address, account)
        .then((res) => {
          setIsContributor(res);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
  }, [address, account]);

  return (
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
        <Typography variant="h5" component="h2">
          Started on:
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {campaignSummary.createdAt}
        </Typography>
        <Typography variant="h5" component="h2">
          Manager:
        </Typography>
        <Typography color="textSecondary">{campaignSummary.manager}</Typography>
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
        <WCButton
          disabled={!account.length}
          label="Join Us"
          onClick={
            !account.length ? null : () => setIsContributionDialogOpen(true)
          }
        />
        {account.length !== 0 &&
          (isContributor || campaignSummary.manager === account) && (
            <WCButton
              label="View Requests"
              onClick={() =>
                history.push(`/campaign/${campaignSummary.address}/requests`)
              }
            />
          )}
      </CardActions>
      <FormDialog
        isOpen={isContributionDialogOpen}
        onClose={() => setIsContributionDialogOpen(false)}
        minimumContribution={campaignSummary.minimumContribution}
        onContribute={onContribute}
      />
    </Card>
  );
}

export { SummaryCard };