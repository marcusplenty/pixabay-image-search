import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ImageDetail = () => {
  const { imageId } = useParams();
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${imageId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch image details');
        }

        const data = await response.json();

        if (data.hits.length > 0) {
          setImageDetails(data.hits[0]);
        } else {
          setError('Image details not found');
        }
      } catch (error) {
        setError('An error occurred while fetching image details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <img
        src={imageDetails.webformatURL}
        alt={imageDetails.tags}
        aria-describedby="image-description"
      />
      <p>User: {imageDetails.user}</p>
      <p>Tags: {imageDetails.tags}</p>
      <Link to="/" aria-label="Back to Search">Back to Search</Link>
    </div>
  );
};

export default ImageDetail;
