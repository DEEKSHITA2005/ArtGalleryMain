import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArtworkCard.css';

const ArtworkCard = ({ id, title, price, artist, onAddToCart }) => {
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the image Blob
    fetch(`http://localhost:8081/api/artworks/${id}/image`)
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error('Failed to fetch image');
      })
      .then((blob) => setImageSrc(URL.createObjectURL(blob)))
      .catch((error) => console.error('Error fetching artwork image:', error));
  }, [id]);

  const handleCardClick = () => {
    navigate(`/product/${id}`); // Navigate to ProductPage with the artwork ID
  };

  return (
    <div className="artwork-card" onClick={handleCardClick}>
      <div className="image-box">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="artwork-image" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>By {artist}</p>
        <p>${price}</p>
      </div>
      <button
        className="cart-button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart({ id, image: imageSrc, title, price, artist });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ArtworkCard;
