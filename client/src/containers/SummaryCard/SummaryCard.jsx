import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { EthereumContext } from "../../contexts";
import { WCButton } from "../../stories/";
import { useHistory, useParams } from "react-router-dom";
import { FormDialog } from "../../components";
import { fetchIsContributor } from "../../helpers/functions";
import { useCampaignMutation } from "../../hooks/CampaignHook";

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
  const { campaignSummary } = props;
  const classes = useStyles();

  const [isContributionDialogOpen, setIsContributionDialogOpen] =
    useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [amount, setAmount] = useState("");

  // Contribution hook
  const { makeContribution } = useCampaignMutation();
  const { mutate: contribute } = makeContribution;

  const handleContribution = (amount) => {
    setAmount("");
    contribute({
      address,
      amount,
      onClose: () => setIsContributionDialogOpen(false),
    });
  };

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

  const inputs = [
    {
      label: "In Wei",
      value: amount,
      onChange: (e) => setAmount(e.target.value),
    },
  ];

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
        title="Contribute"
        description={
          <>
            To contribute please enter the amount in wei
            <br />
            <strong>Note: </strong>
            Contributions must be greater than
            {campaignSummary.minimumContribution} wei
          </>
        }
        inputs={inputs}
        onSubmit={() => handleContribution(amount)}
      />
    </Card>
  );
}

export { SummaryCard };
