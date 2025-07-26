import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import MyAds from "./Pages/MyAds/MyAds";
import { useAuth } from "./Context/auth";
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer/Footer'
import './App.css'; 

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/my-ads" element={
              <ProtectedRoute>
                <MyAds />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <Footer /> 
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
