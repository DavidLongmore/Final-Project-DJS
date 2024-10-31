import React from 'react';

function Favourites({ favourites, toggleFavourite }) {
  return (
    <div className="favourites">
      <h1>Your Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites yet!</p>
      ) : (
        <ul>
          {favourites.map((episode) => (
            <li key={`${episode.showTitle}-${episode.episode}`} className="show-item">
              <h3>{episode.title}</h3>
              <p>From: {episode.showTitle}</p>
              <button onClick={() => toggleFavourite(episode)}>
                Remove from Favourites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favourites;
