import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ExhibitionDetailPage.css';

const ExhibitionDetailPage = ({ match }) => {
  const [exhibition, setExhibition] = useState(null);
  const exhibitionId = match.params.id;

  useEffect(() => {
    axios.get(`/exhibitions/${exhibitionId}`)
      .then((response) => {
        setExhibition(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exhibition details:', error);
      });
  }, [exhibitionId]);

  return (
    <div className="exhibition-detail-container">
      {exhibition ? (
        <div className="exhibition-detail">
          <img src={exhibition.imageUrl} alt={exhibition.title} className="exhibition-image" />
          <div className="exhibition-info">
            <h2>{exhibition.title}</h2>
            <p>{exhibition.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading exhibition details...</p>
      )}
    </div>
  );
};

export default ExhibitionDetailPage;
