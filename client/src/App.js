import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components";
import Routing from "./Routing";
import "./App.css";
import { EthereumContextProvider } from "./contexts";

function App() {
  return (
    <div className="app">
      <Router>
        <EthereumContextProvider>
          <Navbar />
          <Routing />
        </EthereumContextProvider>
      </Router>
    </div>
  );
}

export default App;
