import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      setError('An error occurred while fetching images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="searchInput">Search for images:</label>
      <input
        type="text"
        id="searchInput"
        placeholder="e.g. mountains, beach, animals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search input"
      />
      <button
        onClick={handleSearch}
        disabled={loading || !searchTerm}
        aria-label="Search button"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <div className="image-container">
        {error && <div className="error-message">{error}</div>}
        {images.map((image) => (
          <Link key={image.id} to={`/image/${image.id}`} tabIndex="0">
            <img
              src={image.previewURL}
              alt={image.tags}
              className="image-item"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
