import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../../utils/firebase';
import Navbar from '../../Components/Navbar/Navbar';
import './ProductDetail.css'; // Optional: your styles

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireStore, 'products', id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <>
    <Navbar/>
    <div className="product-detail-page">
      <h2>{product.title}</h2>
      <img src={product.imageUrl} alt={product.title} className="product-detail-img" />
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Posted by:</strong> {product.userName}</p>
      <p><strong>Date:</strong> {product.createAt}</p>
    </div>
    </>
  );
};

export default ProductDetail;
