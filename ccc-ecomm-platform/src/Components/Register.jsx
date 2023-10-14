import React, { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [emailInput, setEmail] = useState("");
  const [pwdInput, setPwd] = useState("");
  const [errStatus, setErrStatus] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setErrStatus(false);
    setErr("");

    event.target.name === "email"
      ? setEmail(event.target.value)
      : setPwd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (emailInput !== "" && pwdInput !== "") {
        await axios.post(
          "http://localhost:4000/register",
          JSON.stringify({ email: emailInput, password: pwdInput }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          }
        );

        navigate("/login");
      } else {
        return;
      }
    } catch (err) {
      console.log("err ", err);
      if (err?.response?.status === 404) {
        setErrStatus(true);
        setErr("No Response from Server");
      } else if (err.response.status === 409) {
        setErrStatus(true);
        setErr("Email Already Taken");
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
          <h1>Register</h1>
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
          <p>Already Registered?</p>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
