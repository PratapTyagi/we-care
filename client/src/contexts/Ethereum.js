import { useState, createContext, useEffect } from "react";
import { connectWallet } from "../utils";

const EthereumContext = createContext({});

const EthereumContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("account")) return;
    setAccount(localStorage.getItem("account"));
    return () => {
      localStorage.removeItem("account");
    };
  }, []);

  const addAccount = async () => {
    const fetchedAccount = await connectWallet();
    setAccount(fetchedAccount);
    localStorage.setItem("account", fetchedAccount);
  };

  const removeAccount = () => {
    setAccount("");
    localStorage.removeItem("account");
  };

  const value = {
    account,
    addAccount,
    removeAccount,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

export { EthereumContext, EthereumContextProvider };
