import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import mockTrackObjs from '../mockData/mockTracks';

function App() {
  const [searchResults, setSearchResults] = useState(mockTrackObjs);
  const [playlistName, setPlaylistName] = useState('My playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleSearch = (searchTerm) => {
    // Logic to handle search
    // For now, we're just using mock data
    setSearchResults(mockTrackObjs);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.includes(track)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter(currentTrack => currentTrack.id !== track.id));
  };

  return (
    <div>
      <h1>Ja<span>mmm</span>ing</h1>
      <SearchBar onSearch={handleSearch}/>
      <div>
        <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist}/>
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrackFromPlaylist}
          onNameChange={updatePlaylistName}
        />
      </div>
    </div>
  );
}

export default App;
