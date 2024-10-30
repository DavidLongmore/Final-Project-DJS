// src/components/AudioPlayer.jsx
import React from 'react';

function AudioPlayer({ episode }) {
  return (
    <div>
      <h3>Now Playing: {episode.title}</h3>
      <audio controls>
        <source src={episode.audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
