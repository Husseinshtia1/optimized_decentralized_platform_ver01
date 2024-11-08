
// backend/controllers/ipfsVersionController.js
const { create } = require('ipfs-http-client');
const fs = require('fs');

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
let fileMetadata = {}; // In-memory metadata store for simplicity

/**
 * Uploads a file with metadata and version tracking.
 * @param {Buffer} fileBuffer - Buffer of the file.
 * @param {string} fileName - Name of the file.
 * @returns {Promise<Object>} Metadata and CID.
 */
const uploadFileWithMetadata = async (fileBuffer, fileName) => {
  const { path: cid } = await ipfs.add(fileBuffer);
  const timestamp = new Date().toISOString();

  if (!fileMetadata[fileName]) {
    fileMetadata[fileName] = [];
  }

  const versionData = { cid, timestamp };
  fileMetadata[fileName].push(versionData);

  return { fileName, cid, timestamp };
};

/**
 * Retrieves the metadata for a specific file.
 * @param {string} fileName - Name of the file.
 * @returns {Array<Object>} List of versions with metadata.
 */
const getFileMetadata = (fileName) => {
  return fileMetadata[fileName] || [];
};

/**
 * Retrieves a specific version of a file from IPFS.
 * @param {string} cid - IPFS Content Identifier.
 * @returns {Promise<Buffer>} File buffer.
 */
const retrieveFileVersion = async (cid) => {
  const stream = ipfs.cat(cid);
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

module.exports = { uploadFileWithMetadata, getFileMetadata, retrieveFileVersion };
