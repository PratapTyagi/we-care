import "./App.css";
import { Home, Navbar, NewCampaign } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/campaign/new" component={NewCampaign} />
      </Router>
    </div>
  );
}

export default App;
