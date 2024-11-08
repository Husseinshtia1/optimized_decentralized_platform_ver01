
// backend/controllers/aiPredictionController.js

const tf = require('@tensorflow/tfjs-node');

/**
 * Builds a simple linear regression model to predict future user growth.
 * @returns {tf.Sequential} TensorFlow model.
 */
const buildModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
  return model;
};

/**
 * Trains the model with sample data.
 * @returns {Promise<tf.Sequential>} Trained TensorFlow model.
 */
const trainModel = async (model) => {
  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([10, 20, 30, 40], [4, 1]);

  await model.fit(xs, ys, { epochs: 250 });
  return model;
};

/**
 * Predicts future values based on input.
 * @param {number} input - Input value for prediction.
 * @returns {Promise<number>} Predicted output.
 */
const predict = async (input) => {
  const model = buildModel();
  await trainModel(model);

  const prediction = model.predict(tf.tensor2d([input], [1, 1]));
  const result = await prediction.array();
  return result[0][0];
};

module.exports = { predict };
