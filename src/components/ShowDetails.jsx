// src/components/ShowDetails.jsx
import React, { useState, useEffect } from 'react';
import SeasonEpisodes from './SeasonEpisodes';

function ShowDetails({ show, onBack }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    fetchEpisodes(show.id, selectedSeason);
  }, [show, selectedSeason]);

  const fetchEpisodes = async (showId, season) => {
    const response = await fetch(`https://podcast-api.netlify.app/shows/${showId}/season/${season}`);
    const data = await response.json();
    setEpisodes(data.episodes);
  };

  const handleAddToFavorites = (episode) => {
    // Logic to add episode to favourites
  };

  return (
    <div>
      <button onClick={onBack}>Back to Shows</button>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <select onChange={(e) => setSelectedSeason(Number(e.target.value))}>
        {[...Array(show.seasons)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Season {i + 1}
          </option>
        ))}
      </select>
      <SeasonEpisodes episodes={episodes} onAddToFavorites={handleAddToFavorites} />
    </div>
  );
}

export default ShowDetails;
