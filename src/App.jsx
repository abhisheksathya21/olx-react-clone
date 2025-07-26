import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import MyAds from "./Pages/MyAds/MyAds";
import { useAuth } from "./Context/auth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; 

  return user ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/my-ads" element={
            <ProtectedRoute>
              <MyAds />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
