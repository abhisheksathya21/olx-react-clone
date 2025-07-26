import React, { useState } from 'react';
import { Modal, ModalBody } from 'flowbite-react';
import Input from '../../Input/Input';
import './EditAdModal.css';

const EditAdModal = ({ ad, onClose, onSave }) => {
  const [title, setTitle] = useState(ad.title || '');
  const [category, setCategory] = useState(ad.category || '');
  const [price, setPrice] = useState(ad.price || '');
  const [description, setDescription] = useState(ad.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !price || !description.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedAd = {
      title: title.trim(),
      category: category.trim(),
      price: parseFloat(price),
      description: description.trim(),
    };

    onSave(ad.id, updatedAd);
    onClose();
  };

  return (
    <div className="sell-wrapper">
      <Modal onClick={onClose} show={true}>
        <ModalBody onClick={(e) => e.stopPropagation()} className="modal-centered-wrapper">
          <div className="sell-modal-content">
            <h3 className="sell-title">Edit Ad</h3>

            <form className="sell-form" onSubmit={handleSubmit}>
              <Input value={title} setInput={setTitle} placeholder="Title" />
              <Input value={category} setInput={setCategory} placeholder="Category" />
              <Input value={price} setInput={setPrice} placeholder="Price" />
              <Input value={description} setInput={setDescription} placeholder="Description" />

              <div className="submit-container">
                <button type="submit" className="sell-button">Save</button>
                <button type="button" className="sell-button cancel-btn" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditAdModal;
