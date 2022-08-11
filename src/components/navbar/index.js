import React from "react";

import "./navbar.scss";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const searchBar = props.searchBar;
  const searchList = props.searchList;
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <img src={logo} onClick={clickHandler} alt="instaplay logo" />
      {searchBar ? (
        <input
          type="search"
          placeholder="Search movies"
          onChange={(e) => searchList(e.target.value)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
