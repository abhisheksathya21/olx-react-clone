import React from 'react';
import './Card.css';
import { FaRegHeart } from 'react-icons/fa'; // outlined heart
import { Link } from 'react-router-dom';


const Card = ({ items }) => {
  return (
    <div className="card-container">
      <h2 className="card-title">Fresh Recommendations</h2>
      <div className="card-grid">
        {items.map((item, index) => (
         <Link to={`/product/${item.id}`} key={item.id} className="card-link">
             <div className="card-item" key={item.id}>
            <div className="card-content">
             <div className="card-image-container">
  <span className="heart-icon">
    <FaRegHeart />
  </span>
  <img 
    src={item.imageUrl || 'https://via.placeholder.com/150'} 
    alt={item.title}
    className="card-image"
  />
</div>

              <div className="card-details">
                <h3 className="card-price">₹ {item.price}</h3>
                <p className="card-category">{item.category}</p>
                <p className="card-title-text">{item.title}</p>
              </div>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Card;