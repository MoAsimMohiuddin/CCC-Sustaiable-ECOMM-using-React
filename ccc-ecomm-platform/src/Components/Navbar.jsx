import React, { useContext } from "react";
import Input from "./Input";
import "./App.css";
import AuthContext from "../Context/authProvider";
import { useNavigate } from "react-router-dom";
import ProductsContext from "../Context/productsProvider";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { products, setProducts, setFilteredProducts } = useContext(ProductsContext);

  const fetchProducts = async () => {
    try{
      const response = await axios.get("http://localhost:4000/api", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      });
  
      setProducts(response.data);
      setFilteredProducts(response.data);
    }catch(err) {
      console.log("err ",err);
      navigate('/login');
    }
  };
  
  const handleSearch = (event) => {
    if (event.target.value !== "") {
      const patagoniaUpdated = products.patagonia.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

      const tentreeUpdated = products.tentree.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

      const productsUpdated = {
        patagonia: patagoniaUpdated,
        tentree: tentreeUpdated,
      };

      setProducts(productsUpdated);
      setFilteredProducts(productsUpdated);
    }else{
      fetchProducts();
    }
  };

  async function handleKeyDown(event) {
    if (event.key === "Backspace") {
      try {
        if (event.target.value === "") {
          fetchProducts();
        }

        try{
          const response = await axios.get("http://localhost:4000/api", {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          });

          const patagoniaUpdated = response.data.patagonia.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(event.target.value.toLowerCase());
          });
    
          const tentreeUpdated = response.data.tentree.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(event.target.value.toLowerCase());
          });
    
          const productsUpdated = {
            patagonia: patagoniaUpdated,
            tentree: tentreeUpdated,
          };
    
          setProducts(productsUpdated);
          setFilteredProducts(productsUpdated)
        }catch(err) {
          console.log("Error Broo");
          console.log(err);
          navigate("/login");
          return;
        }


      } catch (err) {
        console.log("Error Fetching Products", err);
      }
    }
  }

  return (
    <div className="navbar">
      <Sidebar/>
      <h1 className="navbar-heading">GreenThreads</h1>
      <ul className="navbar-links">
        <li>
          <Link className="link" to="/home">
            Home
          </Link>
        </li>
        <li>
        <Link
            // activeClass="active"
            to="cards"
            smooth={true}
            offset={-500}
            duration={2000}
          >Products
          </Link>
        </li>
        <li>
          <a className="link" href="#">
            About us
          </a>
        </li>
        <li>
        <Link
            // activeClass="active"
            to="footer"
            smooth={true}
            offset={-500}
            duration={2000}
          >Contact Us
          </Link>
        </li>
      </ul>

      <Input
        className="navbar-input"
        type="text"
        placeholder="Search..."
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
      />

      {!auth.accessToken && (
        <div>
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
