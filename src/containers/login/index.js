import React, { useEffect, useState } from "react";
import "./login.scss";
import Navbar from "../../components/navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = Cookies.get("token");

    if (cookieExists) {
      navigate("/");
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [nameEmpty, setNameEmpty] = useState(true);
  const [emailEmpty, setEmailEmpty] = useState(true);

  const isThreeChar = (value) =>
    value.trim().length < 3 && value.trim().length > 0;

  const isEmpty = (value) => value.trim().length === 0;

  const getToken = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f"
    );

    console.log(response.data.request_token);
    Cookies.set("token", response.data.request_token, { expires: 1 });
    navigate("/");
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() !== 0) {
      setNameValid(true);
      setNameEmpty(true);
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
    setEmailEmpty(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNameValid = !isThreeChar(name);
    const nameNotEmpty = !isEmpty(name);
    const emailNotEmpty = !isEmpty(email);
    const enteredEmailValid =
      (email.includes("@") && email.includes(".co")) || email.length === 0;

    setNameEmpty(nameNotEmpty);
    setNameValid(enteredNameValid);
    setEmailEmpty(emailNotEmpty);
    setEmailValid(enteredEmailValid);

    const isFormValid =
      enteredEmailValid &&
      enteredNameValid &&
      name.length !== 0 &&
      email.length !== 0;

    if (!isFormValid) {
      return;
    }
    setName("");
    setEmail("");
    getToken();
  };

  return (
    <div className="login">
      <Navbar />
      <div className="formContainer">
        <form className="loginForm" onSubmit={submitHandler}>
          <div className="nameContainer">
            <label htmlFor="name">Name</label>
            <input
              className={`${!nameValid || !nameEmpty ? "warningBox" : ""}`}
              id="name"
              type="text"
              value={name}
              onChange={nameHandler}
            />
          </div>
          {!nameValid && (
            <p className="warning">Name should contain atleast 3 letters</p>
          )}
          {!nameEmpty && <p className="warning">Name should not be empty</p>}

          <div className="emailContainer">
            <label htmlFor="email">E-mail</label>
            <input
              className={`${!emailValid || !emailEmpty ? "warningBox" : ""}`}
              id="email"
              type="text"
              value={email}
              onChange={emailHandler}
            />
          </div>
          {!emailValid && <p className="warning">Enter a valid email id</p>}
          {!emailEmpty && <p className="warning">Email should not be empty</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
