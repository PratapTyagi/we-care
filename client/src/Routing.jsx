import { Route } from "react-router-dom";
import { Addrequest } from "./components";
import {
  CampaignDetailsPage,
  CreateCampaignPage,
  Home,
  ViewRequestsPage,
} from "./pages";

const Routing = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/campaigns/create" exact component={CreateCampaignPage} />
      <Route path="/campaign/:address" exact component={CampaignDetailsPage} />
      <Route
        path="/campaign/:address/requests"
        exact
        component={ViewRequestsPage}
      />
      <Route
        path="/campaign/:address/requests/addrequest"
        component={Addrequest}
      />
    </>
  );
};

export default Routing;
