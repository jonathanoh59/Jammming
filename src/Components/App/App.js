import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import mockTrackObjs from '../mockData/mockTracks';
import Spotify from '../Spotify/Spotify.js';

function App() {
  const [searchResults, setSearchResults] = useState([]); //useState(mockTrackObjs);
  const [playlistName, setPlaylistName] = useState('My playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleSearch = async (term) => {
      try {
          const results = await Spotify.search(term);
          setSearchResults(results);
      } catch (error) {
          console.error('Error during Spotify search:', error);
      }
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

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    try{
        Spotify.savePlaylist(playlistName, trackURIs);
        setPlaylistTracks([]);
        setPlaylistName('New Playlist');
    } catch (error) {
        console.error('Error during savePlaylist: ', error);
    }
  };

  // const savePlaylist = () => {
  //   const trackURIs = playlistTracks.map(track => track.uri);
  //   console.log('Saving playlist with URIs:', trackURIs);
  //   // Mock saving functionality
  //   // Later, here you'll interact with the Spotify API to save the playlist

  //   // Resetting the current playlist in the web app
  //   setPlaylistTracks([]);
  //   setPlaylistName('New Playlist');
  // };

  return (
    <div className="App">
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <SearchBar onSearch={handleSearch}/>
      <div>
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrackToPlaylist}
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrackFromPlaylist}
          onNameChange={updatePlaylistName}
          onSave ={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
