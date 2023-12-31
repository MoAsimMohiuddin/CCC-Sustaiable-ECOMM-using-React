import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Buynow = () => {
  const [msg, setMsg]=useState(false);

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setMsg(true);

    setTimeout(()=>{
      setMsg(false);
      navigate('/home');
    }, 2500);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <Sidebar />
      <form
        style={{ width: "40vw" }}
        className="form-container"
        onSubmit={handleSubmit}
      >
        <h2 className="payment-header">Place Your Order</h2>
        <label htmlFor="fullName">
          Full Name
        </label>
        <input
          className="input"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <label style={{ padding: "0px" }}>Payment Method</label>
        <select
          style={{ padding: "10px" }}
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Select Payment Method</option>
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        <label>Expiry Date</label>
        <input
          type="text"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />
        <label>CVV</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />
        <button
          style={{ padding: "5px", margin: "5px" }}
          type="submit"
        >
          Place Order
        </button>
        {msg && <h3>Order Recieved. Thank you.</h3>}
      </form>
    </div>
  );
};

export default Buynow;
