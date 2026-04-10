import React, { useState } from 'react';
import VoteSystem from './VoteSystem';

const DogCard = ({ imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="dog-card glass-panel">
      {!imageLoaded && (
        <div className="image-skeleton">
          <div className="spinner"></div>
        </div>
      )}
      <div className="dog-image-container">
        <img 
          src={imageUrl} 
          alt="A beautiful doggo" 
          className={`dog-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        {imageLoaded && (
          <div className="dog-card-overlay">
            <VoteSystem />
          </div>
        )}
      </div>
    </div>
  );
};

export default DogCard;
