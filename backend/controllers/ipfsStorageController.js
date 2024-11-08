
// backend/controllers/ipfsStorageController.js
const { create } = require('ipfs-http-client');
const crypto = require('crypto');
const fs = require('fs');

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

/**
 * Encrypts a file before uploading it to IPFS.
 * @param {Buffer} buffer - File buffer.
 * @returns {Buffer} Encrypted file buffer.
 */
const encryptFile = (buffer) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encrypted, key, iv };
};

/**
 * Uploads an encrypted file to IPFS.
 * @param {Buffer} fileBuffer - Buffer of the file to upload.
 * @returns {Promise<string>} IPFS CID.
 */
const uploadEncryptedFile = async (fileBuffer) => {
  const { encrypted, key, iv } = encryptFile(fileBuffer);
  const { path: cid } = await ipfs.add(encrypted);
  return { cid, key: key.toString('hex'), iv: iv.toString('hex') };
};

/**
 * Retrieves a file from IPFS by CID and decrypts it.
 * @param {string} cid - IPFS Content Identifier.
 * @param {string} keyHex - Encryption key in hex format.
 * @param {string} ivHex - Initialization vector in hex format.
 * @returns {Promise<Buffer>} Decrypted file buffer.
 */
const retrieveAndDecryptFile = async (cid, keyHex, ivHex) => {
  const stream = ipfs.cat(cid);
  const encrypted = Buffer.concat(await streamToBuffer(stream));

  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted;
};

/**
 * Helper function to convert IPFS stream to buffer.
 * @param {AsyncIterable<Buffer>} stream - IPFS stream.
 * @returns {Promise<Buffer>} Concatenated buffer.
 */
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return chunks;
};

module.exports = { uploadEncryptedFile, retrieveAndDecryptFile };
