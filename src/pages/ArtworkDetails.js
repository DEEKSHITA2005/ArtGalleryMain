import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ArtworkDetails.css';

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/artworks/${id}`)
      .then((response) => response.json())
      .then((data) => setArtwork(data))
      .catch((error) => console.error('Error fetching artwork details:', error));
  }, [id]);

  if (!artwork) return <p>Loading...</p>;

  return (
    <div className="artwork-details">
      <h2>{artwork.title}</h2>
      <p>By {artwork.artist}</p>
      <p>${artwork.price}</p>
      <p>{artwork.description}</p>
    </div>
  );
};

export default ArtworkDetails;
