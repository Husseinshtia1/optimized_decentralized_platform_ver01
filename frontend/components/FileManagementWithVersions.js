
// frontend/components/FileManagementWithVersions.js
import React, { useState, useEffect } from 'react';

const FileManagementWithVersions = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [versions, setVersions] = useState([]);
  const [status, setStatus] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // Upload file with metadata and version tracking
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/ipfs/upload?name=${fileName}`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setStatus(`Uploaded version with CID: ${data.cid}`);
    fetchVersions(fileName);
  };

  // Fetch versions of a specific file
  const fetchVersions = async (name) => {
    const response = await fetch(`/api/ipfs/metadata?name=${name}`);
    const data = await response.json();
    setVersions(data);
  };

  // Retrieve a specific version of the file
  const retrieveVersion = async (cid) => {
    const response = await fetch(`/api/ipfs/retrieve?cid=${cid}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setStatus('File retrieved successfully!');
  };

  return (
    <div className="file-management-with-versions">
      <h2>IPFS File Management with Versions</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <p>{status}</p>

      <h3>File Versions</h3>
      <ul>
        {versions.map((version, index) => (
          <li key={index}>
            <p>CID: {version.cid}</p>
            <p>Timestamp: {version.timestamp}</p>
            <button onClick={() => retrieveVersion(version.cid)}>Retrieve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManagementWithVersions;
