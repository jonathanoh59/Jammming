import React from 'react';
//import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div>
      <h1>Ja<span>mmm</span>ing</h1>
      <SearchBar />
      <div>
        <SearchResults/>
        <Playlist />
      </div>
    </div>
  );
}

export default App;
