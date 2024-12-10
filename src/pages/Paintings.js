import React, { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import '../styles/Paintings.css';

const Paintings = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch artworks in the "Paintings" category from the backend
    fetch('http://localhost:8081/api/artworks/category/Paintings')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch paintings');
      })
      .then((data) => setArtworks(data))
      .catch((error) => console.error('Error fetching paintings:', error));
  }, []);

  return (
    <div className="paintings-page">
      <h2 className="page-title">Explore Our Paintings</h2>
      <div className="artworks-grid">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              price={artwork.price}
              artist={artwork.artist}
              onAddToCart={(item) => console.log('Added to cart:', item)}
            />
          ))
        ) : (
          <p>No paintings found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Paintings;
