import { useEffect } from "react";
import "./App.css";
import factory from "./factory.js";
import { Navbar } from "./components/index";

function App() {
  useEffect(() => {
    const t = async () => await factory.methods.getCampaigns().call();
    t()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="app">
      <Navbar />
    </div>
  );
}

export default App;
