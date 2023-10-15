import React, { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Context/authProvider";

const Login = () => {
  const [emailInput, setEmail] = useState("");
  const [pwdInput, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [errStatus, setErrStatus] = useState(false);

  const useAuth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setErrStatus(false);
    setErr(" ");

    event.target.name === "email"
      ? setEmail(event.target.value)
      : setPwd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        JSON.stringify({ email: emailInput, password: pwdInput }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );

      // console.log("response");
      // console.log(response.data);

      useAuth.setAuth({ email: emailInput, accessToken: response.data.jwt });

      navigate("/home");
    } catch (err) {
      setErrStatus(true);

      if (err.response.status === 401) {
        setErr("Unautheticated");
      }else if(err.response.status===429){
        setErr("Too Many Requests. Please Try Again Later");
      } else {
        setErr("Server Err");
      }
    }
  };

  return (
    <div className="full-container">
      <div className="heading-container">
        <h1 className="login-heading">GreenThreads</h1>
        <h3>
          Style that respects the Earth - Where fashion meets sustainability.
        </h3>
      </div>
      <div className="container" onSubmit={handleSubmit}>
        <form className="form-container">
          {errStatus ? <p className="err">{err}</p> : null}
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            className="input emailInput"
            type="email"
            autoComplete="off"
            value={emailInput}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            className="input passwordInput"
            type="password"
            autoComplete="off"
            value={pwdInput}
            onChange={handleChange}
          />
          <Input className="submit-button" type="submit" value="submit"></Input>
          <p>Create New Account?</p>
          <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
