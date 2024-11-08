
import React, { useState } from 'react';
import axios from 'axios';

function MetadataSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchMetadata = async () => {
        try {
            const response = await axios.post('/api/ipfs/search', { query });
            setResults(response.data.results);
        } catch (error) {
            alert('Search failed');
        }
    };

    return (
        <div>
            <h2>IPFS Metadata Search</h2>
            <input
                type="text"
                placeholder="Search metadata"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchMetadata}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <strong>{result.name}</strong>: {result.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MetadataSearch;
