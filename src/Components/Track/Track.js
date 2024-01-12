import React from 'react';

function Track({ track, isRemoval }) {
  const addTrack = () => {
    // Logic to add track to the playlist
  };

  const removeTrack = () => {
    // Logic to remove track from the playlist
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {
        isRemoval
          ? <button className="Track-action" onClick={removeTrack}>-</button>
          : <button className="Track-action" onClick={addTrack}>+</button>
      }
    </div>
  );
}

export default Track;
