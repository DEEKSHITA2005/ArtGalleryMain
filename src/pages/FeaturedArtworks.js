import React, { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import '../styles/FeaturedArtworks.css';

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch digital arts data from the backend
    fetch('http://localhost:8081/api/artworks/category/Digital Arts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch featured artworks');
      })
      .then((data) => setArtworks(data))
      .catch((error) => console.error('Error fetching featured artworks:', error));
  }, []);

  return (
    <div className="featured-artworks-page">
      <h2 className="page-title">Explore Featured Artworks</h2>
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
          <p>No featured artworks found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedArtworks;
