import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlistName, playlistTracks, onRemove, onNameChange, onSave}){
    const handleNameChange = (e) =>{
        onNameChange(e.target.value);
    }
    
    return(
        <div className="Playlist">
            <input 
                // playlistName={playlistName}
                value={playlistName}
                onChange={handleNameChange}
                className = "Playlist-title"
            />
            <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
            <button
                className="Playlist-save"
                onClick={onSave}
            >SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;