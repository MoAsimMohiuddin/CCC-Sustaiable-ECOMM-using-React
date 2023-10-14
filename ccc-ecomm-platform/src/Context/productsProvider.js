import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsContext=createContext({});

const ProductsProvider=({children})=>{
    console.log("Products Provider");

    const [products, setProducts]=useState({});

    const navigate=useNavigate();

    useEffect(()=>{
        const fetchProducts=async ()=>{
            const response=await axios.get(
                'http://localhost:4000/api',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000"
                    }
                }
            );

            console.log(response.data);

            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return(
        <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
export {ProductsProvider};
