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

const Routing = () => {
  const [account, setAccount] = useState("");
  let accounts;
  useEffect(() => {
    const getAccounts = async () => {
      if (window && window.web3) {
        accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };
  }, []);

  useEffect(() => {
    if (account) {
    } else {
      history.push("/");
    }
  }, []);

  const history = useHistory();

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
