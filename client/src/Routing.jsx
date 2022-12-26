import { Route } from "react-router-dom";
import {
  NewCampaign,
  ViewDetails,
  ViewRequests,
  Addrequest,
} from "./components";
import { CampaignDetailsPage, CreateCampaignPage, Home } from "./pages";

const Routing = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/campaigns/create" exact component={CreateCampaignPage} />
      <Route path="/campaign/:address" exact component={CampaignDetailsPage} />
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
