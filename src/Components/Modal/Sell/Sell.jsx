import React, { useState } from 'react';
import './Sell.css';
import fileUpload from '../../../assets/fileUpload.svg';
import loading from '../../../assets/loading.gif';
import close from '../../../assets/close.svg';
import { Modal, ModalBody } from 'flowbite-react';
import Input from '../../Input/Input';
import { useAuth } from '../../../Context/auth';
import { addDoc, collection } from 'firebase/firestore';
import { fetchFromFireStore, fireStore } from '../../../utils/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Sell = ({ toggleSellModal, status, setItems }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth(); // cleaner destructuring

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const readImageAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        localStorage.setItem(`image_${file.name}`, imageUrl); // optional
        resolve(imageUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error('Please login to continue...');
      return;
    }

    setSubmitting(true);

    let imageUrl = '';
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image);
      } catch (error) {
        console.error(error);
        alert('Failed to read image');
        setSubmitting(false);
        return;
      }
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedCategory || !trimmedDescription || !price) {
      toast.error('All fields are required');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(fireStore, 'products'), {
        title: trimmedTitle,
        category: trimmedCategory,
        price: Number(price),
        description: trimmedDescription,
        imageUrl,
        userId: user.uid,
        userName: user.displayName || 'unknown',
        createdAt: new Date().toISOString(), // ISO for better sorting
      });

      const datas = await fetchFromFireStore();
      setItems(datas);
      toggleSellModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to Firestore');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sell-wrapper">
      <Modal onClick={toggleSellModal} show={status}>
        <ModalBody onClick={(event) => event.stopPropagation()} className="modal-centered-wrapper">
          <img src={close} className="close-btn" onClick={toggleSellModal} alt="close" />

          <div className="sell-modal-content">
            <p className="sell-title">Sell Item</p>
            <form className="sell-form" onSubmit={handleSubmit}>
              <Input setInput={setTitle} placeholder="Title" />
              <Input setInput={setCategory} placeholder="Category" />
              <Input setInput={(val) => setPrice(Number(val))} placeholder="Price" />
              <Input setInput={setDescription} placeholder="Description" />

              <div className="image-upload-section">
                {image ? (
                  <div className="image-preview-container">
                    <img src={URL.createObjectURL(image)} alt="preview" className="preview-image" />
                    <button
                      type="button"
                      className="change-image-btn"
                      onClick={() => setImage(null)}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="file-upload-container">
                    <input
                      type="file"
                      className="file-input"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                    <div className="upload-content">
                      <img src={fileUpload} alt="upload" className="upload-icon" />
                      <p className="upload-text">Click to upload images</p>
                      <p className="file-types">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="loading-container">
                  <img src={loading} alt="loading" className="loading-icon" />
                </div>
              ) : (
                <div className="submit-container">
                  <button type="submit" className="sell-button">
                    Sell Item
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;
