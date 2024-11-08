
// backend/controllers/didAuthenticationController.js
const { create } = require('ipfs-http-client');
const { randomBytes } = require('crypto');
const { ethers } = require('ethers');
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

let dids = {}; // Store DIDs and verifiable credentials

/**
 * Generates a new Decentralized Identity (DID) for a user.
 * @param {string} address - User's Ethereum address.
 * @returns {Object} - DID and metadata.
 */
const generateDID = (address) => {
  const did = `did:platform:${randomBytes(16).toString('hex')}`;
  dids[address] = { did, roles: [] };
  return { did, address };
};

/**
 * Stores a user's verifiable credentials on IPFS.
 * @param {string} address - User's Ethereum address.
 * @param {Array<string>} roles - Roles to be assigned.
 * @returns {Promise<string>} - CID of the stored credentials.
 */
const storeCredentials = async (address, roles) => {
  dids[address].roles = roles;
  const { path: cid } = await ipfs.add(JSON.stringify(dids[address]));
  return cid;
};

/**
 * Retrieves DID metadata for a specific user.
 * @param {string} address - User's Ethereum address.
 * @returns {Object} - DID metadata including roles.
 */
const getDIDMetadata = (address) => {
  return dids[address] || { error: 'DID not found' };
};

module.exports = { generateDID, storeCredentials, getDIDMetadata };
