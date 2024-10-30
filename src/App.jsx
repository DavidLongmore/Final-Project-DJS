// src/App.jsx
import React, { useState, useEffect } from 'react';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import Favourites from './components/Favourites';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    const response = await fetch('https://podcast-api.netlify.app/');
    const data = await response.json();
    setShows(data.shows); // Adjust to fit the actual API response structure
  };

  const addToFavourites = (episode) => {
    setFavourites((prevFavourites) => [...prevFavourites, episode]);
  };

  return (
    <div>
      <h1>Podcast Platform</h1>
      {selectedShow ? (
        <ShowDetails show={selectedShow} onBack={() => setSelectedShow(null)} />
      ) : (
        <ShowList shows={shows} onShowSelect={setSelectedShow} />
      )}
      <Favourites favourites={favourites} />
    </div>
  );
}

export default App;
