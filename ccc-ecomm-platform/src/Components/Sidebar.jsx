import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/authProvider";
import ProductsContext from "../Context/productsProvider";
import axios from "axios";

const Sidebar = () => {
  const [opened, setOpened] = useState(false);
  const { auth } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);

  const { applyFilters, resetFilters, setProducts } =
    useContext(ProductsContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    applyFilters({ brand, price });
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
            <a href="#">Profile</a>
          </li>
          <li className="link">
            <a href="#">Log out</a>
          </li>
          <hr/>
          <li className="link">
            <button onClick={() => setShowForm(!showForm)}>Add Filter</button>
          </li>
        </ul>
        {showForm && (
          <div>
            <form onSubmit={handleFormSubmit}>
              <label>
                <span style={{margin: '10px'}}>Choose Brand:</span>
                <select
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  style={{margin: '20px'}}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="patagonia">Patagonia</option>
                  <option value="tentree">Tentree</option>
                </select>
              </label>
              <br />
              <label>
                Max Price:
                <input
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </label>
              <br />
              <button type="submit">Apply Filters</button>
            </form>
            <button onClick={resetFilters}>Reset Filter</button>
          </div>
        )}
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
