import "./App.css";
import { Home, Navbar, NewCampaign, ViewDetails } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/campaigns/new" exact component={NewCampaign} />
        <Route path="/campaign/:address" exact component={ViewDetails} />
      </Router>
    </div>
  );
}

export default App;
