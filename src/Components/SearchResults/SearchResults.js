import React from 'react';
import './SearchResults.css';
import mockTrackObjs from '../mockData/mockTracks';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults(){
    //mock data
    //const searchResults=[];
    return(
        <div className="SearchResults">
            <h2>Results</h2>
            {/* <Tracklist tracks={searchResults} isRemoval={false}/> */}
            <Tracklist tracks={mockTrackObjs} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;