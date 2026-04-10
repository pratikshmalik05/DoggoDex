import { useState, useEffect } from 'react';
import * as dogApi from './services/api';
import Dropdown from './components/Dropdown';
import Gallery from './components/Gallery';

function App() {
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedSubBreed, setSelectedSubBreed] = useState('');
  
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all breeds on mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setIsLoading(true);
        const breedData = await dogApi.getAllBreeds();
        setBreeds(breedData);
      } catch (err) {
        setError('Failed to fetch breeds.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
    setSelectedSubBreed(''); // Reset sub-breed when breed changes
    setImages([]); // Clear previous images when breed changes
  };

  const handleSubBreedChange = (e) => {
    setSelectedSubBreed(e.target.value);
    setImages([]); // Clear previous images when sub-breed changes
  };

  const fetchImagesForSelection = async () => {
    if (!selectedBreed) return;
    
    setIsLoading(true);
    setError(null);
    try {
      let fetchedImages = [];
      if (selectedSubBreed) {
        fetchedImages = await dogApi.getImagesBySubBreed(selectedBreed, selectedSubBreed, 12);
      } else {
        fetchedImages = await dogApi.getImagesByBreed(selectedBreed, 12);
      }
      setImages(prev => [...prev, ...fetchedImages]);
    } catch (err) {
      setError('Failed to load dog images.');
    } finally {
      setIsLoading(false);
    }
  };

  // When selection changes, if we have a breed (and no sub-breed options, or a selected sub-breed) we should load
  useEffect(() => {
    // If a breed is selected, but it has sub-breeds, and none are selected -> do not load yet
    if (selectedBreed && breeds[selectedBreed]?.length > 0 && !selectedSubBreed) {
      return; 
    }
    
    // Otherwise load
    if (selectedBreed) {
      fetchImagesForSelection();
    }
  }, [selectedBreed, selectedSubBreed]);

  const loadMore = () => {
    fetchImagesForSelection();
  };

  const handleSurpriseMe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const img = await dogApi.getRandomDog();
      setImages([img]); // Clear all and show the single surprise image
      setSelectedBreed('');
      setSelectedSubBreed('');
    } catch (err) {
      setError('Failed to get a surprise doggo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header glass-panel">
        <div className="header-content">
          <h1>🐶 DoggoDex</h1>
          <p className="subtitle">Explore to find your favorite furry friend</p>
        </div>
        <button onClick={handleSurpriseMe} className="btn btn-primary btn-surprise">
          🎲 Surprise Me!
        </button>
      </header>

      <main className="main-content">
        <section className="controls glass-panel">
          <div className="control-group">
            <label htmlFor="breed-select">Select a Breed</label>
            <Dropdown 
              id="breed-select"
              options={Object.keys(breeds).map(b => ({ label: b, value: b }))} 
              value={selectedBreed} 
              onChange={handleBreedChange} 
              placeholder="-- Choose a breed --"
              disabled={isLoading && Object.keys(breeds).length === 0}
            />
          </div>

          {selectedBreed && breeds[selectedBreed]?.length > 0 && (
            <div className="control-group">
              <label htmlFor="subbreed-select">Select a Sub-breed</label>
              <Dropdown 
                id="subbreed-select"
                options={breeds[selectedBreed].map(sb => ({ label: sb, value: sb }))} 
                value={selectedSubBreed} 
                onChange={handleSubBreedChange} 
                placeholder="-- Choose a sub-breed --"
              />
            </div>
          )}
        </section>

        {error && <div className="error-message glass-panel">{error}</div>}

        <Gallery 
          images={images} 
          isLoading={isLoading} 
          onLoadMore={loadMore} 
          showLoadMore={images.length > 0 && selectedBreed !== ''} 
        />
        
        {(!selectedBreed && images.length === 0 && !isLoading) && (
          <div className="empty-state glass-panel">
            <h2>Welcome to DoggoDex! 🐾</h2>
            <p>Select a breed from the dropdown above, or click "Surprise Me!" to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
