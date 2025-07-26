import React, { useEffect, useState } from 'react';
import { fetchUserAds, deleteAdById } from '../../utils/firebase';
import { useAuth } from '../../Context/auth';
import './MyAds.css';
import Navbar from '../../Components/Navbar/Navbar';
import EditAdModal from '../../Components/Modal/EditAdModal/EditAdModal';
import { updateAdById } from '../../utils/firebase';


const MyAds = () => {
  const { user } = useAuth();
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);


  useEffect(() => {
    const getUserAds = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userAds = await fetchUserAds(user.uid);
        setMyAds(userAds);
      } catch (error) {
        console.error('Failed to fetch user ads:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserAds();
  }, [user]);

  const handleDelete = async (adId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
    if (!confirmDelete) return;

    try {
      await deleteAdById(adId);
      // Remove from local state
      setMyAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error('Failed to delete ad:', error);
      alert('Failed to delete ad. Please try again.');
    }
  };

  const handleSaveEdit = async (adId, updatedData) => {
  try {
    await updateAdById(adId, updatedData);
    // Update local state
    const updatedAds = myAds.map(ad => ad.id === adId ? { ...ad, ...updatedData } : ad);
    setMyAds(updatedAds);
    setSelectedAd(null);
  } catch (error) {
    console.error('Failed to update ad:', error);
    alert("Failed to update ad");
  }
};


  return (
    <>
      <Navbar />
      <div className="my-ads-container">
        <h2>My Ads</h2>
        {loading ? (
          <p>Loading your ads...</p>
        ) : myAds.length === 0 ? (
          <p>You haven’t posted any ads yet.</p>
        ) : (
          <div className="ads-grid">
            {myAds.map((ad) => (
              <div key={ad.id} className="ad-card">
                <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
                <div className="ad-info">
                  <h3>{ad.title}</h3>
                  <p>Category: {ad.category}</p>
                  <p>Price: ₹{ad.price}</p>
                  <p>{ad.description}</p>
                 <button
  className="delete-button"
  onClick={() => handleDelete(ad.id)}
>
  Delete
</button>

<button
  className="edit-button"
  onClick={() => setSelectedAd(ad)}
>
  Edit
</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedAd && (
  <EditAdModal
    ad={selectedAd}
    onClose={() => setSelectedAd(null)}
    onSave={handleSaveEdit}
  />
)}

    </>
  );
};

export default MyAds;
