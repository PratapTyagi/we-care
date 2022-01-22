import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  Home,
  NewCampaign,
  ViewDetails,
  ViewRequests,
  Addrequest,
} from "./components";

const Routing = () => {
  const [account, setAccount] = useState("");

  const history = useHistory();

  useEffect(() => {
    const account = localStorage.getItem("accounts");
    setAccount(account);
    if (
      !account &&
      (!history.location.pathname.localeCompare("/campaigns/:address") ||
        !history.location.pathname.startsWith("/campaign"))
    ) {
      history.push("/");
    }
  }, []);

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
