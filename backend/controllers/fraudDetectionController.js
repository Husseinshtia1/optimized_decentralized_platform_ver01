
const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');

// Mock dataset of normal user behavior (replace with real-world data for training)
const NORMAL_REGISTRATION_DATA = [[0.5, 0.2], [0.6, 0.3], [0.4, 0.1]];

// Train a simple anomaly detection model
async function trainModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 4, activation: 'relu', inputShape: [2] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

    const xs = tf.tensor2d(NORMAL_REGISTRATION_DATA);
    const ys = tf.tensor2d([[0], [0], [0]]); // 0 = normal behavior

    await model.fit(xs, ys, { epochs: 100 });
    return model;
}

let detectionModel;

// Initialize and train the model when the server starts
(async () => {
    detectionModel = await trainModel();
    console.log('Fraud detection model trained and ready!');
})();

// Fraud Detection during registration
exports.detectFraud = async (req, res, next) => {
    const { ip, username } = req.body;

    // Mock input (normalize real-world data appropriately)
    const inputTensor = tf.tensor2d([[Math.random(), Math.random()]]);

    const prediction = detectionModel.predict(inputTensor);
    const risk = prediction.dataSync()[0]; // Risk score between 0 and 1

    if (risk > 0.7) {
        console.warn(`High-risk registration detected for user: ${username}, IP: ${ip}`);
        return res.status(403).json({ message: 'Suspicious activity detected. Manual verification required.' });
    }

    next(); // Proceed to the actual registration
};
