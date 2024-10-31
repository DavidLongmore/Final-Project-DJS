import React, { useState, useEffect } from 'react';
import ShowList from './components/ShowList';
import Favourites from './components/Favourites';
import Modal from './components/Modal';

function App() {
  const [shows, setShows] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [view, setView] = useState('shows'); // State to toggle between views

  // Fetch shows from API when the component mounts
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        const data = await response.json();
        setShows(data); // Assuming data is an array of shows
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="App">
      <nav style={styles.nav}>
        <h1 style={styles.title}>Podcast App</h1>
        <div style={styles.navLinks}>
          <button onClick={() => setView('shows')}>Shows</button>
          <button onClick={() => setView('favourites')}>Favourites</button>
        </div>
      </nav>

      {/* Render the appropriate view based on the state */}
      {view === 'shows' && (
        <ShowList 
          shows={shows} 
          toggleFavourite={(episode) => {
            if (favourites.some(fav => fav.episode === episode.episode && fav.showTitle === episode.showTitle)) {
              setFavourites(favourites.filter(fav => !(fav.episode === episode.episode && fav.showTitle === episode.showTitle)));
            } else {
              setFavourites([...favourites, { ...episode, showTitle: episode.showTitle }]);
            }
          }} 
          favourites={favourites} 
          setFavourites={setFavourites} 
        />
      )}
      {view === 'favourites' && (
        <Favourites 
          favourites={favourites} 
          toggleFavourite={(episode) => {
            if (favourites.some(fav => fav.episode === episode.episode && fav.showTitle === episode.showTitle)) {
              setFavourites(favourites.filter(fav => !(fav.episode === episode.episode && fav.showTitle === episode.showTitle)));
            } else {
              setFavourites([...favourites, { ...episode, showTitle: episode.showTitle }]);
            }
          }} 
        />
      )}
    </div>
  );
}

// Simple styles for the navbar
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: '10px',
    color: 'limegreen',
  },
  title: {
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default App;
