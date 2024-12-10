import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Paintings',
      image: '/images/sunset.webp',
      link: '/paintings',
    },
    {
      id: 2,
      title: 'Sculptures',
      image: '/images/sculpture1.jpg',
      link: '/sculptures',
    },
    {
      id: 3,
      title: 'Featured Artworks',
      image: '/images/abstract1.jpg',
      link: '/featured',
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <img
          className="hero-image"
          src="/images/gallery-hero.webp"
          alt="Gallery Hero"
        />
        <h1 className="hero-title">Welcome to ArtGallery</h1>
        
        <div className="gallery-section">
          {galleryItems.map((item) => (
            <div className="gallery-item" key={item.id}>
              <img src={item.image} alt={item.title} className="gallery-image" />
              <h3 className="gallery-item-title">{item.title}</h3>
              <a href={item.link} className="action-button">
                View More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
