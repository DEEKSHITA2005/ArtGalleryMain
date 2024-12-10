import React from 'react';
import '../styles/Blogs.css';

const blogs = [
  {
    id: 1,
    title: 'The Evolution of Abstract Art',
    content: 'Abstract art has been around for over a century, challenging the traditional perceptions of art...',
    author: 'John Doe',
    date: 'September 20, 2023',
    image: '/images/abstract_art.webp',
    link: 'https://www.fizzypeaches.com/2024/04/the-evolution-of-abstract-art-in-the-digital-age.html/',
  },
  {
    id: 2,
    title: 'Exploring Contemporary Sculpture',
    content: 'Contemporary sculpture reflects the diversity and complexity of today’s world, blending materials and...',
    author: 'Jane Smith',
    date: 'October 5, 2023',
    image: '/images/sculpture.jpg',
    link: 'https://www.artalistic.com/en/blog/What-is-contemporary-sculpture/',
  },
  {
    id: 3,
    title: 'The Renaissance Masters',
    content: 'The Renaissance period brought forth some of the most iconic figures in art history, including Leonardo da Vinci and Michelangelo...',
    author: 'Alice Williams',
    date: 'August 30, 2023',
    image: '/images/renaissance_masters.jpg',
    link: 'https://stephaniestorey.com/blog/tag/Italian+Renaissance',
  },
  {
    id: 4,
    title: 'The Impact of Digital Art',
    content: 'As technology advances, digital art has become a powerful medium that bridges the gap between the virtual and the physical worlds...',
    author: 'Michael Lee',
    date: 'July 18, 2023',
    image: '/images/digital_art.png',
    link: 'https://www.awberyart.com/blog/the-art-world-in-the-digital-age-will-traditional-art-survive',
  },
];

const Blogs = () => {
  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Art Gallery Blogs</h1>
      <div className="blogs-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-author">By {blog.author} | {blog.date}</p>
              <p className="blog-excerpt">{blog.content.substring(0, 150)}...</p>
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <button className="read-more-button">Read More</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
