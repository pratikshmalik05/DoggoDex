import React from 'react';
import DogCard from './DogCard';

const Gallery = ({ images, isLoading, onLoadMore, showLoadMore }) => {
  return (
    <section className="gallery-section">
      <div className="gallery-grid">
        {images.map((url, index) => (
          <DogCard key={`${url}-${index}`} imageUrl={url} />
        ))}
      </div>

      {isLoading && (
        <div className="loading-container glass-panel">
          <div className="spinner"></div>
          <p>Fetching amazing doggos...</p>
        </div>
      )}

      {showLoadMore && !isLoading && (
        <div className="load-more-container">
          <button onClick={onLoadMore} className="btn btn-secondary">
            🔄 Load More Doggos
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
