import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [opened, setOpened]=useState(false);

  return (
    <div>
      {opened && (
        <div className="modal-overlay" onClick={() => setOpened(false)}></div>
      )}
      <div className={`sidebar ${opened ? "open" : ""}`}>
        <ul className="sidebar-links">
          <li className="link">
            <Link to="/cart">View Cart</Link>
          </li>
          <li className="link">
            <a href="#">Profile</a>
          </li>
          <li className="link">
            <a href="#">Log out</a>
          </li>
        </ul>
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
