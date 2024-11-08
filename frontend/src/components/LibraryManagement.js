
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibraryManagement = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
        const fetchLibraries = async () => {
            const response = await axios.get('/api/libraries');
            setLibraries(response.data);
        };
        fetchLibraries();
    }, []);

    return (
        <div>
            <h2>Library Management</h2>
            <ul>
                {libraries.map(library => (
                    <li key={library._id}>
                        <h3>{library.name} (v{library.version})</h3>
                        <p>{library.description}</p>
                        <a href={library.repository} target="_blank" rel="noopener noreferrer">Repository</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LibraryManagement;
