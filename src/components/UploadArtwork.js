import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadArtwork.css';

const UploadArtwork = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Paintings'); // Default category
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true during submission
    setError(null); // Reset error state
    setSuccess(false); // Reset success state

    if (!image) {
      alert('Please upload an image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8081/api/artworks/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true); // Set success state
      alert('Artwork uploaded successfully!');
      console.log('Response:', response.data);

      // Reset form fields after successful upload
      setTitle('');
      setArtist('');
      setPrice('');
      setDescription('');
      setCategory('Paintings');
      setImage(null);
    } catch (error) {
      console.error('Error uploading artwork:', error.response?.data || error.message);
      setError('Failed to upload artwork. Please check your inputs and try again.');
    } finally {
      setLoading(false); // Always set loading to false at the end
    }
  };

  return (
    <div className="upload-artwork-container">
      <h2 className="upload-artwork-title">Upload Artwork</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Artwork uploaded successfully!</p>}

      <form className="upload-artwork-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-input"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="artist" className="form-label">Artist</label>
        <input
          type="text"
          id="artist"
          className="form-input"
          placeholder="Enter artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          id="price"
          className="form-input"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />

        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Paintings">Paintings</option>
          <option value="Sculptures">Sculptures</option>
          <option value="Digital Arts">Digital Arts</option>
        </select>

        <label htmlFor="image" className="form-label">Upload Image</label>
        <input
          type="file"
          id="image"
          className="form-file-input"
          onChange={handleFileChange}
          required
        />

        <button
          type="submit"
          className="form-submit-button"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Artwork'}
        </button>
      </form>
    </div>
  );
};

export default UploadArtwork;
