
// frontend/components/FileManagement.js
import React, { useState } from 'react';

const FileManagement = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [status, setStatus] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to IPFS
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/ipfs/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setCid(data.cid);
    setKey(data.key);
    setIv(data.iv);
    setStatus('File uploaded successfully!');
  };

  // Retrieve file from IPFS
  const retrieveFile = async () => {
    const response = await fetch(
      `/api/ipfs/retrieve?cid=${cid}&key=${key}&iv=${iv}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'retrieved_file';
    a.click();
    setStatus('File retrieved successfully!');
  };

  return (
    <div className="file-management">
      <h2>IPFS File Management</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <p>{status}</p>
      <div>
        <input
          type="text"
          value={cid}
          placeholder="CID"
          onChange={(e) => setCid(e.target.value)}
        />
        <input
          type="text"
          value={key}
          placeholder="Encryption Key"
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          value={iv}
          placeholder="IV"
          onChange={(e) => setIv(e.target.value)}
        />
        <button onClick={retrieveFile}>Retrieve File</button>
      </div>
    </div>
  );
};

export default FileManagement;
