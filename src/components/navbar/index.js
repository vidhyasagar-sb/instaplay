import React, { useState } from "react";

import "./navbar.scss";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const searchBar = props.searchBar;
  const searchList = props.searchList;
  const loader = props.loader;
  const logoutFeature = props.logoutFeature;
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const cookieExists = Cookies.get("token");

  const clickHandler = () => {
    navigate("/");
  };

  const changeHandler = (e) => {
    setKeyword(e.target.value);
    searchList(e.target.value);
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    navigate("/login");
    toast.success("Successfully logged out !");
  };

  return (
    <>
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
        {logoutFeature && cookieExists ? (
          <button className="logoutButton" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Navbar;
