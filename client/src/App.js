import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components";
import Routing from "./Routing";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </div>
  );
}

export default App;
