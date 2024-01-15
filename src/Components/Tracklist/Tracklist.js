import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({tracks, isRemoval, onAdd, onRemove}){
    return(
        <div className="Tracklist">
            {
                tracks.map(track =>{
                    return <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />
                })
            }
        </div>
    );
}

export default Tracklist;
  