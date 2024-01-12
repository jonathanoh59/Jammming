import React from 'react';
 import './SearchBar.css';

function SearchBar(){
    return(
        <div>
            <input placeholder="Enter a song, album or artist" />
            <button className="SearchButton">SEARCH</button>
        </div>
    );
}

export default SearchBar;