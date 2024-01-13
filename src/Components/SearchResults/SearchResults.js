import React from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults(){
    //mock data
    const searchResults=[];
    return(
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={searchResults} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;