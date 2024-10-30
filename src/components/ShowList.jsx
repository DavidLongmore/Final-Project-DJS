import React, { useEffect, useState } from 'react';

const ShowList = () => {
  const [shows, setShows] = useState([]);  // Initialize as an empty array to avoid undefined errors
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/");
        const data = await response.json();
        setShows(data); // Set the shows data here
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchShows();
  }, []);

  // Check if shows exist before attempting to sort
  const sortedShows = shows ? [...shows].sort((a, b) => a.title.localeCompare(b.title)) : [];

  if (loading) return <p>Loading...</p>; // Show loading message while fetching

  return (
    <ul>
      {sortedShows.map(show => (
        <li key={show.id}>
          <img src={show.image} alt={show.title} />
          <h3>{show.title}</h3>
          <p>{show.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default ShowList;
