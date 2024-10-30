// src/components/Favourites.jsx
import React, { useState } from 'react';

function Favourites({ favourites }) {
  const [sortOrder, setSortOrder] = useState('A-Z');

  const sortedFavourites = favourites.sort((a, b) => {
    if (sortOrder === 'A-Z') return a.title.localeCompare(b.title);
    if (sortOrder === 'Z-A') return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div>
      <h2>Favourites</h2>
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <ul>
        {sortedFavourites.map((episode) => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
