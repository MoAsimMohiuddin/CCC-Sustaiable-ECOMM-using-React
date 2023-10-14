import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Missing from "./Missing";
import Home from "./Home";
import { ProductsProvider } from "../Context/productsProvider";
import RequireAuth from "./RequireAuth";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/*" element={<Missing />} />
          <Route exact path="/home" element={
            <ProductsProvider><Home /></ProductsProvider>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
