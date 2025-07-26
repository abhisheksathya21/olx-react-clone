import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/symbol.png';
import search from '../../assets/search1.svg';
import arrow from '../../assets/arrow-down.svg';
import favorite from '../../assets/favorite.svg';
import { useAuth } from '../../Context/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import './Navbar.css';

const Navbar = ({ toggleModal, toggleSellModal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      toast.success("successfully logedout")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo with Link to Home */}
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="OLX Logo" className="logo" />
        </Link>
        <div className="location">
          <img src={search} alt="" className="search-icon" />
          <input type="text" placeholder="India" />
          <img src={arrow} alt="" className="arrow-icon" />
        </div>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder='Search "Jobs"' className="search-input" />
        <button className="search-button">
          <img src={search} alt="Search" />
        </button>
      </div>

      <div className="navbar-right">
        <select className="language-select">
          <option>ENGLISH</option>
        </select>
        <img src={favorite} alt="Favorites" className="favorite-icon" />

        {user ? (
          <>
            <span className="user-name">Hi, {user.displayName || 'User'}</span>
            <button className="my-ads-btn" onClick={() => navigate('/my-ads')}>
              My Ads
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={toggleModal}>
            Login
          </button>
        )}

        <button className="sell-btn" onClick={toggleSellModal}>+ SELL</button>
      </div>
    </nav>
  );
};

export default Navbar;
