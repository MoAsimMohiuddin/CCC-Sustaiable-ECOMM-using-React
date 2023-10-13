import React, { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailInput, setEmail] = useState("");
  const [pwdInput, setPwd] = useState("");
  const [err, setErr]=useState('');
  const [errStatus, setErrStatus]=useState(false);

  const handleChange = (event) => {
    setErrStatus(false);
    setErr(' ');

    event.target.name === "email"
      ? setEmail(event.target.value)
      : setPwd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const response=await axios.post(
        'http://localhost:4000/login',
        JSON.stringify({email: emailInput, password: pwdInput}),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
          }
        }
      );

      console.log(response.data);
    }catch(err) {
      setErrStatus(true);

      if(err.response.status===401) {
        setErr('Unautheticated');
      }else{
        setErr('Server Err');
      }
    }
  };

  return (
    <div className="container" onSubmit={handleSubmit}>
      <form className="form-container">
        {errStatus? <p className="err">{err}</p>: null}
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <Input
          name="email"
          className="input"
          type="email"
          autoComplete="off"
          value={emailInput}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <Input
          name="password"
          className="input"
          type="password"
          autoComplete="off"
          value={pwdInput}
          onChange={handleChange}
        />
        <Input type="submit" value="submit"></Input>
        <p>Create New Account?</p>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;