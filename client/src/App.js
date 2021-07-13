import { useEffect } from "react";
import "./App.css";
import factory from "./factory.js";
function App() {
  useEffect(() => {
    const t = async () => await factory.methods.getCampaigns().call();
    t()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return <div className="App">We Care</div>;
}

export default App;
