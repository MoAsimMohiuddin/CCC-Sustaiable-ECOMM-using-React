import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../Context/authProvider";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({});
  const { auth } = useContext(AuthContext);
  const [price, setPrice] = useState(0);


  let keyy = 1;

  const removeItem=async (element)=>{
    try{
        const response=await axios.post(
            'http://localhost:4000/api/removeitem',
            JSON.stringify({email: auth.email, brand: element.brand, id: element.id}),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            }
        );

        console.log(response.data);
    }catch(err) {
        console.log("err ", err);
    }
  };

  const handleBuy=async ()=>{
    const response=await axios.post(
        'http://localhost:4000/api/buy',
        JSON.stringify({email: auth.email}),
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        }
    );
    console.log(response.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/getcart",
          JSON.stringify({ email: auth.email }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          }
        );

        console.log(response.data);
        setCart(response.data);
        setPrice(response.data.total);
      } catch (err) {
        console.log("err");
      }
    };

    fetchData();
  }, []);

  if (auth.email) {
    return (
      <div className="container">
        <div>
          <ul className="form-container">
            {cart.result &&
              cart.result.map((element) => {
                return (
                  <li id={element.id} key={keyy++} brand={element.brand}>
                    <h3>{element.name} <button onClick={() => removeItem(element)}>Remove</button></h3>
                  </li>
                );
              })}
          <button className="buy-now" style={{height: '5vh', marginTop: '20px'}} onClick={handleBuy}>Buy Now</button>
          </ul>
          <h1 style={{ textAlign: "center" }}>Total: {price} $</h1>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Cart;
