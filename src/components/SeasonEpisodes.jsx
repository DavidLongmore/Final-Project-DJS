// src/components/SeasonEpisodes.jsx
import React from 'react';
import AudioPlayer from './AudioPlayer';

function SeasonEpisodes({ episodes, onAddToFavorites }) {
  return (
    <div>
      <h3>Episodes</h3>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <div className="episode-info">
              <h4>{episode.title}</h4>
              <p>Duration: {episode.duration}</p>
              <button onClick={() => onAddToFavorites(episode)}>Add to Favourites</button>
            </div>
            <AudioPlayer episode={episode} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeasonEpisodes;
