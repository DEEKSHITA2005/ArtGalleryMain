import React, { useState, useEffect } from 'react';
import '../styles/Exhibitions.css';

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);

  // Mock data for testing
  useEffect(() => {
    // Simulate data returned from API for testing
    const mockExhibitions = [
      {
        id: 1,
        title: 'Modern Art Showcase',
        description: 'An exhibition of contemporary and abstract art from various artists.',
        startDate: '2024-01-15',
        endDate: '2024-03-01',
        imageUrl: '/images/exhibition1.jpeg', // Ensure the image exists in your public folder
      },
      {
        id: 2,
        title: 'Renaissance Revival',
        description: 'An in-depth look into the Renaissance era of art, featuring classical works.',
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        imageUrl: '/images/exhibition2.jpg',
      },
      {
        id: 3,
        title: 'Renaissance Revival',
        description: 'An in-depth look into the Renaissance era of art, featuring classical works.',
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        imageUrl: '/images/exhibition3.webp',
      },
      {
        id: 4,
        title: 'Renaissance Revival',
        description: 'An in-depth look into the Renaissance era of art, featuring classical works.',
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        imageUrl: '/images/exhibition4.webp',
      },
    ];

    setExhibitions(mockExhibitions);
  }, []);

  return (
    <div className="exhibitions-container">
      <h2 className="page-title">Explore Exhibitions</h2>

      {exhibitions.length > 0 ? (
        <div className="exhibitions-grid">
          {exhibitions.map((exhibition) => (
            <div key={exhibition.id} className="exhibition-card">
              <img
                src={exhibition.imageUrl}
                alt={exhibition.title}
                className="exhibition-image"
              />
              <div className="exhibition-info">
                <h3>{exhibition.title}</h3>
                <p>{exhibition.description}</p>
                <p>
                  <strong>Dates:</strong> {exhibition.startDate} -{' '}
                  {exhibition.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No exhibitions available</p>
      )}
    </div>
  );
};

export default Exhibitions;
