
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);

exports.pinFileToIPFS = async (req, res) => {
    try {
        const result = await pinata.pinFileToIPFS(req.file.buffer);
        res.json({ ipfsHash: result.IpfsHash });
    } catch (error) {
        console.error('IPFS Pinning Failed:', error);
        res.status(500).json({ message: 'IPFS pinning failed' });
    }
};
