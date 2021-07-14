import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
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
          className="link"
          to="/campaigns/new"
          style={{ textDecoration: "none", backgroundColor: "white" }}
        >
          <p className="navbar__right__add" alt="Create Campaign">
            +
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
