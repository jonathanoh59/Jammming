import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import mockTrackObjs from '../mockData/mockTracks';

function App() {
  const [searchResults, setSearchResults] = useState(mockTrackObjs);

  const handleSearch = (searchTerm) => {
    // Logic to handle search
    // For now, we're just using mock data
    setSearchResults(mockTrackObjs);
  };

  return (
    <div>
      <h1>Ja<span>mmm</span>ing</h1>
      <SearchBar onSearch={handleSearch}/>
      <div>
        <SearchResults searchResults={mockTrackObjs}/>
        <Playlist />
      </div>
    </div>
  );
}

export default App;
