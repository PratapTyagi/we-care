import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components";
import Routing from "./Routing";
import "./App.css";
import { EthereumContextProvider, ToasterContextProvider } from "./contexts";

function App() {
  return (
    <div className="app">
      <Router>
        <ToasterContextProvider>
          <EthereumContextProvider>
            <Navbar />
            <Routing />
          </EthereumContextProvider>
        </ToasterContextProvider>
      </Router>
    </div>
  );
}

export default App;
