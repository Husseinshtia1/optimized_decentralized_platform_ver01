
// backend/controllers/aiClusteringController.js
const tf = require('@tensorflow/tfjs-node');

/**
 * Builds a clustering model to analyze user behavior patterns.
 * @returns {tf.Sequential} TensorFlow clustering model.
 */
const buildClusteringModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
  return model;
};

/**
 * Trains the clustering model with user interaction data.
 * @param {tf.Sequential} model - TensorFlow clustering model.
 * @returns {Promise<void>} Resolves when training completes.
 */
const trainClusteringModel = async (model) => {
  const xs = tf.tensor2d([[1, 2], [2, 3], [3, 4], [5, 6], [8, 9]]);
  const ys = tf.tensor2d([[0], [0], [1], [1], [1]]);
  await model.fit(xs, ys, { epochs: 50 });
};

/**
 * Predicts a user's behavioral cluster.
 * @param {Array<number>} input - Array of interaction data.
 * @returns {Promise<number>} Cluster prediction (0 or 1).
 */
const predictCluster = async (input) => {
  const model = buildClusteringModel();
  await trainClusteringModel(model);
  const prediction = model.predict(tf.tensor2d([input], [1, 2]));
  const result = await prediction.array();
  return Math.round(result[0][0]);
};

module.exports = { predictCluster };
