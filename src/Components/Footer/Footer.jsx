import React from 'react';
import './Footer.css';
// import googlePlay from '../../assets/google-play.png';
// import appStore from '../../assets/app-store.png';

const Footer = () => {
  return (
    <footer className="olx-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>POPULAR LOCATIONS</h4>
          <p>Kolkata</p>
          <p>Mumbai</p>
          <p>Chennai</p>
          <p>Pune</p>
        </div>
        <div className="footer-section">
          <h4>TRENDING LOCATIONS</h4>
          <p>Bhubaneshwar</p>
          <p>Hyderabad</p>
          <p>Chandigarh</p>
          <p>Nashik</p>
        </div>
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <p>Tech@OLX</p>
          <p>Careers</p>
        </div>
        <div className="footer-section">
          <h4>OLX</h4>
          <p>Blog</p>
          <p>Help</p>
          <p>Sitemap</p>
          <p>Legal & Privacy information</p>
          <p>Vulnerability Disclosure Program</p>
        </div>
        <div className="footer-section">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-instagram" />
            <i className="fab fa-twitter" />
            <i className="fab fa-youtube" />
          </div>
          {/* <img src={googlePlay} alt="Google Play" className="store-badge" />
          <img src={appStore} alt="App Store" className="store-badge" /> */}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="brands">
          <span>CarTrade</span>
          <span>OLX</span>
          <span>carwale</span>
          <span>bikewale</span>
          <span>MOBILITY OUTLOOK</span>
        </div>
        <p>Help - Sitemap</p>
        <p>All rights reserved © 2006-2025 OLX</p>
      </div>
    </footer>
  );
};

export default Footer;
