import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [account, setAccount] = useState("");
  useEffect(() => {
    if (
      localStorage.getItem("accounts") &&
      localStorage.getItem("accounts").length
    ) {
      setAccount(localStorage.getItem("accounts"));
    }
  }, []);

  let getAccounts = async () => {
    if (window && typeof window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      localStorage.setItem("accounts", accounts[0]);
    }
  };

  return (
    <div className="navbar">
      <Link className="link" to="/" style={{ textDecoration: "none" }}>
        <h1>WeCare</h1>
      </Link>
      <div className="navbar__right">
        <a href="https://github.com/PratapTyagi">
          <img src="https://cdn.afterdawn.fi/v3/news/original/github-logo.png" />{" "}
          Github
        </a>
        <Link
          to="/campaigns/new"
          className="link"
          style={{ textDecoration: "none" }}
        >
          Create
        </Link>
        {account ? (
          <button
            onClick={() => {
              setAccount("");
              localStorage.removeItem("accounts");
            }}
            style={{
              backgroundColor: "red",
            }}
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={getAccounts}
            style={{ backgroundColor: "rgb(117, 212, 27)" }}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
