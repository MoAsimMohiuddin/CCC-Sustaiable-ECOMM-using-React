import React, {useState} from "react";
import Input from "./Input";
import { Link } from "react-router-dom";

const Login=()=>{
    const [emailInput, setEmail]=useState('');
    const [pwdInput, setPwd]=useState('');

    const handleChange=(event)=>{
        event.target.name==='email'?setEmail(event.target.value):setPwd(event.target.value);
    };

    return(
        <div>
        <form>
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