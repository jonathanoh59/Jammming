import React from 'react';
import './SearchResults.css';
//import mockTrackObjs from '../mockData/mockTracks';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({searchResults, onAdd}){
    //mock data
    //const searchResults=[];
    return(
        <div className="SearchResults">
            <h2>Results</h2>
            {/* <Tracklist tracks={searchResults} isRemoval={false}/> */}
            <Tracklist tracks={searchResults} isRemoval={false} onAdd={onAdd}/>
        </div>
    );
}

export default SearchResults;