import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/authProvider";
import ProductsContext from "../Context/productsProvider";
// import axios from "axios";

const Sidebar = () => {
  const [opened, setOpened] = useState(false);
  const { auth } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  const { applyFilters, resetFilters} =
    useContext(ProductsContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    applyFilters({ brand, price, minPrice });
  };

  return (
    <div>
      {opened && (
        <div className="modal-overlay" onClick={() => setOpened(false)}></div>
      )}
      <div className={`sidebar ${opened ? "open" : ""}`}>
        <ul className="sidebar-links">
          <li className="link">
            <Link to={auth.email ? "/cart" : "/login"}>View Cart</Link>
          </li>
          <li className="link">
            <Link to={auth.email ? "/profile" : "/login"}>Profile</Link>
          </li>
          <li className="link">
            <Link to={auth.email ? "/home" : "/login"}>Home</Link>
          </li>
          <li className="link">
            <a href="/home">Log out</a>
          </li>
          <hr />
          <li className="link">
            <button
              className="add-filter"
              onClick={() => setShowForm(!showForm)}
            >
              Add Filter
            </button>
          </li>
        </ul>
        <hr />
        {showForm && (
          <div>
            <form className='sidebar-cont' onSubmit={handleFormSubmit}>
              <label>
                <span style={{ margin: "10px" }}>Choose Brand:</span>
                <select
                  className="dropdown-menu"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  style={{ margin: "20px" }}
                >
                  <option className="dropdown-item" value="">
                    --Please choose an option--
                  </option>
                  <option className="dropdown-item" value="patagonia">
                    Patagonia
                  </option>
                  <option className="dropdown-item" value="tentree">
                    Tentree
                  </option>
                </select>
              </label>
              <br />
              <label>
                Max Price:
                <input
                  className="price-inp"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </label>
              <br />
              <label>
                Min Price:
                <input
                  className="price-inp"
                  type="number"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
              </label>
              <br />
              <button className="filter-button" type="submit">
                Apply Filters
              </button>
            </form>
            <button className="filter-button" onClick={resetFilters}>
              Reset Filter
            </button>
          </div>
        )}
        <hr />
        <button className="close-button" onClick={() => setOpened(false)}>
          Close
        </button>
      </div>
      <button className="open-button" onClick={() => setOpened(true)}>
        &#9776;
      </button>
    </div>
  );
};

export default Sidebar;
