import React, { useContext } from "react";
import Input from "./Input";
import "./App.css";
import AuthContext from "../Context/authProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const navigate=useNavigate();

  return (
    <div className="navbar">
      <h1 className="navbar-heading">GreenThreads</h1>
      <ul className="navbar-links">
        <li>
          <a className="link" href="/home">
            Home
          </a>
        </li>
        <li>
          <a className="link" href="/home">
            Products
          </a>
        </li>
        <li>
          <a className="link" href="/home">
            About us
          </a>
        </li>
        <li>
          <a className="link" href="/home">
            Contact us
          </a>
        </li>
      </ul>

      <Input
        className="navbar-input"
        type="text"
        placeholder="Search..."
        // onKeyDown={handleKeyDown}
        // onChange={handleSearch}
      />

      {!auth.accessToken && (
        <div>
          <button className="navbar-button" onClick={()=>{
            navigate('/login')
        }}>Sign In</button>
          <button className="navbar-button" onClick={()=>{
              navigate('/register')
          }}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
