import React, { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import '../styles/Sculptures.css';

const Sculptures = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch sculptures data from the backend
    fetch('http://localhost:8081/api/artworks/category/Sculptures')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch sculptures');
      })
      .then((data) => setArtworks(data))
      .catch((error) => console.error('Error fetching sculptures:', error));
  }, []);

  return (
    <div className="sculptures-page">
      <h2 className="page-title">Explore Our Sculptures</h2>
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
          <p>No sculptures found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Sculptures;
