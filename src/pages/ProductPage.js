import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css';

const ProductPage = ({ onAddToCart, cartItems = [] }) => {
  const { id } = useParams(); // Get the artwork ID from the URL
  const [artwork, setArtwork] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isInCart, setIsInCart] = useState(false); // Track if the product is already in the cart

  useEffect(() => {
    // Fetch artwork details
    fetch(`http://localhost:8081/api/artworks/${id}`)
      .then((response) => response.json())
      .then((data) => setArtwork(data))
      .catch((error) => console.error('Error fetching artwork details:', error));

    // Fetch artwork image
    fetch(`http://localhost:8081/api/artworks/${id}/image`)
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error('Failed to fetch image');
      })
      .then((blob) => setImageSrc(URL.createObjectURL(blob)))
      .catch((error) => console.error('Error fetching artwork image:', error));
  }, [id]);

  useEffect(() => {
    // Check if the product is already in the cart
    const productInCart = cartItems.some((item) => item.id === parseInt(id));
    setIsInCart(productInCart);
  }, [cartItems, id]);

  if (!artwork) return <p>Loading artwork details...</p>;

  return (
    <div className="product-page">
      <div className="product-page-container">
        {/* Left side: Images */}
        <div className="product-images">
          <div className="thumbnail-images">
            <img src={imageSrc} alt={`${artwork.title} thumbnail`} />
          </div>
          <div className="main-image">
            <img src={imageSrc} alt={artwork.title} />
          </div>
        </div>

        {/* Right side: Details */}
        <div className="product-details">
          <h1>{artwork.title}</h1>
          <p className="bestseller">BESTSELLER!</p>
          <p className="price">${artwork.price.toFixed(2)}</p>
          <p className="description">{artwork.description}</p>

          {isInCart ? (
            <button className="add-to-bag-button disabled" disabled>
              Already in Bag
            </button>
          ) : (
            <button
              className="add-to-bag-button"
              onClick={() => onAddToCart({ id: parseInt(id), image: imageSrc, ...artwork })}
            >
              Add to Bag
            </button>
          )}

          <div className="additional-details">
            <h3>The Details</h3>
            <p>Dimensions: 8 in. x 6.5 in.</p>
            <p>Cover Art by {artwork.artist}</p>
            <p>Hardcover 3-ring binder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
