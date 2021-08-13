import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  Home,
  NewCampaign,
  ViewDetails,
  ViewRequests,
  Addrequest,
} from "./components";
import web3 from "./web3";

const getAccounts = async () => {
  if (window && window.web3) {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
};

const Routing = () => {
  const [account, setAccount] = useState("");

  const history = useHistory();

  useEffect(() => {
    getAccounts()
      .then((userAddress) => setAccount(userAddress))
      .catch((err) => console.log(err));
    if (
      !account &&
      (!history.location.pathname.localeCompare("/campaigns/:address") ||
        !history.location.pathname.startsWith("/campaign"))
    ) {
      history.push("/");
    }
  }, [history, account]);

  return (
    <>
      {account ? (
        <>
          <Route path="/" exact component={Home} />
          <Route path="/campaigns/new" exact component={NewCampaign} />
          <Route path="/campaign/:address" exact component={ViewDetails} />
          <Route
            path="/campaign/:address/requests"
            exact
            component={ViewRequests}
          />
          <Route
            path="/campaign/:address/requests/addrequest"
            component={Addrequest}
          />
        </>
      ) : (
        <>
          <Route path="/" exact component={Home} />
          <Route path="/campaigns/new" exact component={NewCampaign} />
          <Route path="/campaign/:address" exact component={ViewDetails} />
        </>
      )}
    </>
  );
};

export default Routing;
