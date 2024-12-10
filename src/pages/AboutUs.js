import React from 'react';
import '../styles/AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About ArtGallery</h1>
        <p>Your journey to discovering the world's finest artworks begins here.</p>
      </section>

      <section className="about-content">
        <div className="about-info">
          <h2>Who We Are</h2>
          <p>
            At ArtGallery, we are passionate about connecting people to the beauty of art from all corners of the world.
            Our mission is to create a platform where art enthusiasts can explore and appreciate the rich diversity of creative expression.
          </p>
        </div>

        <div className="about-info">
          <h2>Our Vision</h2>
          <p>
            We believe that art should be accessible to everyone. Whether you're a collector, an admirer, or an artist yourself, 
            ArtGallery offers a space for you to engage with, appreciate, and support the artists you love.
          </p>
        </div>

        <div className="about-info">
          <h2>What We Do</h2>
          <p>
            We curate collections of exquisite paintings, sculptures, digital art, and more, showcasing the work of emerging and established artists alike. 
            With features like virtual tours, exhibitions, and exclusive artist collaborations, ArtGallery is the premier destination for art lovers.
          </p>
        </div>

        <div className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={process.env.PUBLIC_URL + '/images/team1.png'} alt="Team Member 1" />
              <h3>Deekshita</h3>
              <p>Team Lead</p>
            </div>
            <div className="team-member">
              <img src={process.env.PUBLIC_URL + '/images/team2.jpg'} alt="Team Member 2" />
              <h3>Tharun</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member">
              <img src={process.env.PUBLIC_URL + '/images/team3.jpg'} alt="Team Member 3" />
              <h3>Pavan Kumar</h3>
              <p>Backend Developer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
