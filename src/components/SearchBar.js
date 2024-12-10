import React, { useState } from 'react';
import '../styles/SearchBar.css'; // Import the correct CSS file

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery); // Pass the search query back to Navbar or parent component
    }
  };

  return (
    <div className="search-container">
      <div className="search-section">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for art"
          onChange={handleInputChange} // Update state with input value
        />
      </div>
      
      <button className="search-button" onClick={handleSearchClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
