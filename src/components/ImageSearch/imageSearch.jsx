import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo`
      );

      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for images"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {images.map((image) => (
            <img src={image.previewURL} alt={image.tags} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
