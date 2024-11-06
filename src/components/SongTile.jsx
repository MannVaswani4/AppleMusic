// SongTile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SongTile.css';

const SongTile = ({ song, isSignedIn }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    if (isSignedIn) {
      console.log(`Playing song: ${song.title}`);
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="song-tile">
      <img src={song.thumbnail} alt={song.title} />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist.map(artist => artist.name).join(', ')}</p>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
};

export default SongTile;
