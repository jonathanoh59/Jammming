import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(term);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleTermChange} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
