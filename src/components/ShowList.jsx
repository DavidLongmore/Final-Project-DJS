import React, { useState } from 'react';
import Modal from './Modal';

function ShowList({ shows, toggleFavourite, favourites }) {
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowClick = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      setSelectedShow(data);  // Store the selected show data
      setIsModalOpen(true);    // Set modal state to open
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  const toggleEpisodeFavourite = (episode) => {
    if (favourites.some(fav => fav.episode === episode.episode && fav.showTitle === selectedShow.title)) {
      toggleFavourite({ ...episode, showTitle: selectedShow.title }); // Remove from favourites
    } else {
      toggleFavourite({ ...episode, showTitle: selectedShow.title }); // Add to favourites
    }
  };

  return (
    <div>
      {shows.map((show) => (
        <div key={show.id} onClick={() => handleShowClick(show.id)}>
          <h2>{show.title}</h2>
          <button>View Seasons</button>
        </div>
      ))}

      {/* Render the Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedShow && (
          <div>
            <h2>{selectedShow.title}</h2>
            <p>{selectedShow.description}</p>
            <h3>Seasons</h3>
            {selectedShow.seasons.map((season, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <h4>{season.title}</h4>
                <button onClick={() => setSelectedShow({ ...selectedShow, selectedSeason: season })}>
                  View Episodes
                </button>
                {selectedShow.selectedSeason === season &&
                  season.episodes.map((episode) => (
                    <div key={episode.episode}>
                      <h5>Episode {episode.episode}: {episode.title}</h5>
                      <p>{episode.description}</p>
                      <button onClick={() => toggleEpisodeFavourite(episode)}>
                        {favourites.some((fav) => fav.episode === episode.episode && fav.showTitle === selectedShow.title) ? 'Unfavourite' : 'Favourite'}
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ShowList;
