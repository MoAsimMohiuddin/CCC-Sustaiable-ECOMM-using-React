import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AuthContext from "../Context/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const RequireAuth = () => {
  const useAuth = useContext(AuthContext);
  const [authState, setAuthState] = useState({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    console.log("At Home Route");
    console.log(useAuth.auth);

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/verifytoken",
          JSON.stringify({ jwt: useAuth.auth.accessToken }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          }
        );

        console.log(response.data);

        const result=response.data;
        setAuthState({ loading: false, authenticated: result === "OK" });
      } catch (err) {
        console.log("err ", err);
        setAuthState({ loading: false, authenticated: false });
      }
    };

    verifyToken();
  }, [useAuth.auth]);

  if (authState.loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (authState.authenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
