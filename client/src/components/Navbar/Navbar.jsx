import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>WeCare</h1>
      <div className="navbar__right">
        <a href="https://github.com/PratapTyagi">
          <img src="https://cdn.afterdawn.fi/v3/news/original/github-logo.png" />{" "}
          Github
        </a>
        <p className="navbar__right__add" alt="Create Campaign">
          +
        </p>
      </div>
    </div>
  );
};

export default Navbar;
