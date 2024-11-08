
import React, { useState } from 'react';
import axios from 'axios';

function IPFSUpload() {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/ipfs/pin', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setIpfsHash(response.data.ipfsHash);
            alert('File pinned to IPFS successfully!');
        } catch (error) {
            alert('Failed to pin file to IPFS');
        }
    };

    return (
        <div>
            <h2>Upload and Pin File to IPFS</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload and Pin</button>
            {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
        </div>
    );
}

export default IPFSUpload;
