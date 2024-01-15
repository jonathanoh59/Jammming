import React, {useState} from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlistName, playlistTracks, onRemove, onNameChange}){
    const handleNameChange = (e) =>{
        onNameChange(e.target.value);
    }
    return(
        <div className="Playlist">
            <input playlistName={playlistName} onChange={handleNameChange}/>
            <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;