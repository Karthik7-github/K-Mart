import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API;

import Enter from "./Pages/enter";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Mainpage from "./Pages/UserPages/mainpage";
import Payments from "./Pages/UserPages/payment";
import Cart from "./Pages/UserPages/cartpage";
import Fetch from "./Components/fetch";
import ItemsPage from "./Pages/UserPages/itemspage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [backendUp, setBackendUp] = useState(false);

  useEffect(() => {
    const checkBackend = () => {
      axios
        .get(`${API}/api/user/get-products`)
        .then(() => {
          setBackendUp(true);
          setLoading(false);
        })
        .catch(() => {
          setBackendUp(false);
          setLoading(false);
        });
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Fetch />;
  }
  if (!backendUp) {
    return <Fetch />;
  }

  return (
    <Routes>
      <Route path="/" element={<Enter />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/item" element={<ItemsPage />} />
    </Routes>
  );
};

export default App;
