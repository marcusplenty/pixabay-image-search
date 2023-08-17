import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ImageDetail = () => {
  const { imageId } = useParams();
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${imageId}`
        );

        const data = await response.json();
        if (data.hits.length > 0) {
          setImageDetails(data.hits[0]); // Assuming image data is an array
        } else {
          setImageDetails(null); // Image not found
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  if (!imageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={imageDetails.webformatURL} alt={imageDetails.tags} />
      <p>User: {imageDetails.user}</p>
      <p>Tags: {imageDetails.tags}</p>
      <Link to="/">Back to Search</Link> 
    </div>
  );
};

export default ImageDetail;
