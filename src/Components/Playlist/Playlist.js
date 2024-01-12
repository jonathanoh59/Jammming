import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(){
    //mock data
    const playlistTracks =[];

    return(
        <div className="Playlist">
            <input defaultValue={'New Playlist'}/>
            <Tracklist tracks={playlistTracks} isRemoval={true} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;