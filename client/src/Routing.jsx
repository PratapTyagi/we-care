import { Route } from "react-router-dom";
import {
  NewCampaign,
  ViewDetails,
  ViewRequests,
  Addrequest,
} from "./components";
import { Home } from "./pages";

const Routing = () => {
  return (
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
  );
};

export default Routing;
