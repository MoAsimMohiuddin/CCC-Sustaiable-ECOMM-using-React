import { useState } from "react";
import ProductsContext from "../Context/productsProvider";
import AuthContext from "../Context/authProvider";
import { useContext } from "react";
import axios from "axios";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const useAuth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!useAuth.auth.accessToken) {
      navigate("/login");
    }

    console.log("Adding to Cart");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/addtocart",
        JSON.stringify({
          brand: props.brand,
          key: props.id,
          email: useAuth.auth.email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (err) {
      console.log("Err, ", err);
    }
  };

  const limitDescription = (desc) => {
    const words = desc.split(" ");
    if (!showFullDescription) {
      return words.slice(0, 25).join(" ") + "...";
    } else {
      return desc;
    }
  };

  return (
    <div className="product">
      <div className="product-image">
        <img src={props.image} alt="Product" />
      </div>
      <h2>{props.name}</h2>
      <p>
        {limitDescription(props.desc)}
        {!showFullDescription && (
          <button
            className="show "
            onClick={() => setShowFullDescription(true)}
          >
            Show More
          </button>
        )}
        {showFullDescription && (
          <div>
            <p>{props.desc}</p>
            <button
              className="show"
              onClick={() => setShowFullDescription(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </p>
      <p>
        <strong>{props.price}$</strong>
      </p>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
      {showNotification && <Notification />}
    </div>
  );
};

const Products = () => {
  const productsContext = useContext(ProductsContext);
  const { products } = productsContext;

  console.log(products);
  return (
    <div className="cards" id='cards'>
      {products &&
        products.patagonia &&
        productsContext.products?.patagonia.map((item) => {
          return (
            <Card
              key={item.id}
              brand="patagonia"
              id={item.id}
              name={item.name}
              desc={item.desc}
              price={item.price}
              image={item.url}
            />
          );
        })}
      {products &&
        products.tentree &&
        productsContext.products?.tentree.map((item) => {
          return (
            <Card
              key={item.id}
              brand="tentree"
              id={item.id}
              name={item.name}
              desc={item.desc}
              price={item.price}
              image="https://huckberry.imgix.net/spree/products/686940/original/75634_Kavu_Highline_Jacquard_Sweater_Dream_Van_02.jpeg?auto=format%2C%20compress&crop=top&fit=clip&cs=tinysrgb&ixlib=react-9.5.2"
            />
          );
        })}
    </div>
  );
};

export default Products;
