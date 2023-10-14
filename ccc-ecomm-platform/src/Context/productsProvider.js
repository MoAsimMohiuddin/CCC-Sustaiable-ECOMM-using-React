import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext({});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [activeFilters, setActiveFilters] = useState({ brand: "", price: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/api", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      });

      setProducts(response.data);
      setFilteredProducts(response.data);
    };

    fetchProducts();
  }, []);

  const applyFilters = (filters) => {
    const { brand, price, minPrice } = filters;

    let filtered = { ...products };

    if (brand) {
      if (brand === "patagonia") {
        filtered.tentree = [];
      } else if (brand === "tentree") {
        filtered.patagonia = [];
      }
    }

    if (price > 0) {
      filtered = {
        ...filtered,
        patagonia: filtered.patagonia.filter((product) => product.price <= price),
        tentree: filtered.tentree.filter((product) => product.price <= price),
      };
    }
    setFilteredProducts(filtered);
    
    if(minPrice>0) {
        filtered={
            ...filtered,
            patagonia: filtered.patagonia.filter((product)=> product.price>=minPrice),
            tentree: filtered.tentree.filter((product)=> product.price>=minPrice)
        }
    }
    setFilteredProducts(filtered);

    setActiveFilters({ brand, price });
  };

  const resetFilters = () => {
    setFilteredProducts(products);
    setActiveFilters({ brand: "", price: 0 });
  };

  return (
    <ProductsContext.Provider
      value={{ products: filteredProducts, applyFilters, resetFilters, activeFilters, setProducts, setFilteredProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsProvider };
