import React, { useState } from "react";

import "./navbar.scss";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const searchBar = props.searchBar;
  const searchList = props.searchList;
  const loader = props.loader;
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const clickHandler = () => {
    navigate(0);
  };

  const changeHandler = (e) => {
    setKeyword(e.target.value);
    searchList(e.target.value);
  };

  return (
    <div className="navbar">
      <img src={logo} onClick={clickHandler} alt="instaplay logo" />
      {searchBar ? (
        <input
          type="search"
          placeholder="Search movies"
          value={keyword}
          onChange={changeHandler}
          className={loader ? "load" : ""}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
