import { Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/authProvider";
import Sidebar from "./Sidebar";

const HistoryCard = (props) => {
  return (
    <div className="product">
      <div className="product-image">
        <img src={props.image} alt="Product" />
      </div>
      <h2>{props.name}</h2>
      <p>
        <strong>{props.price}$</strong>
      </p>
    </div>
  );
};

const Profile = () => {
  const [prod, setProd] = useState({});
  const [error, setError] = useState(false);
  const { auth } = useContext(AuthContext);

  // const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/history",
        JSON.stringify({ email: auth.email }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
      console.log(response.data);
      setProd(response.data.result);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(auth?.accessToken) {
    return(
        <div className="history-container">
          <Sidebar/>
        <h1 style={{textAlign: 'center'}}>Your Order History</h1>
        {error && <p>Error fetching data</p>}
        <ul className="hist-prod-container">
          {prod?.patagonia?.map((element) => (
            <HistoryCard
              key={element.id}
              image={element.url}
              name={element.name}
              price={element.price}
            />
          ))}
        </ul>
        <ul className="hist-prod-container">
          {prod?.tentree?.map((element) => (
            <HistoryCard
              key={element.id}
              image={element.url}
              name={element.name}
              price={element.price}
            />
          ))}
        </ul>
      </div>
    )
  }else{
    return <Navigate to='/login'/>
  }
};

export default Profile;
