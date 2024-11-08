
// backend/controllers/ipfsController.js

const { create } = require('ipfs-http-client');

/**
 * Connects to IPFS and uploads multiple files.
 * @param {Array<Buffer>} files - Array of file buffers to be uploaded.
 * @returns {Promise<Array<string>>} - Array of IPFS hashes.
 */
const uploadMultipleToIPFS = async (files) => {
  const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
  const results = [];

  for (const file of files) {
    const { path } = await ipfs.add(file);
    results.push(path);
  }

  return results;
};

module.exports = { uploadMultipleToIPFS };
