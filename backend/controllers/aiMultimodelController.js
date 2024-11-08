
// backend/controllers/aiMultimodelController.js
const tf = require('@tensorflow/tfjs-node');

/**
 * Builds a classification model to predict categories.
 * @returns {tf.Sequential} TensorFlow classification model.
 */
const buildClassificationModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [4], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });
  return model;
};

/**
 * Builds a clustering model to group data.
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
 * Trains the classification model.
 * @param {tf.Sequential} model - TensorFlow classification model.
 * @returns {Promise<void>} Resolves when training completes.
 */
const trainClassificationModel = async (model) => {
  const xs = tf.tensor2d([
    [5.1, 3.5, 1.4, 0.2],
    [4.9, 3.0, 1.4, 0.2],
    [6.3, 3.3, 6.0, 2.5],
  ]);
  const ys = tf.tensor2d([
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
  ]);
  await model.fit(xs, ys, { epochs: 100 });
};

/**
 * Predicts a category using the classification model.
 * @param {Array<number>} input - Input features.
 * @returns {Promise<Array<number>>} Prediction output.
 */
const classify = async (input) => {
  const model = buildClassificationModel();
  await trainClassificationModel(model);
  const prediction = model.predict(tf.tensor2d([input], [1, 4]));
  return prediction.arraySync()[0];
};

/**
 * Predicts cluster membership using the clustering model.
 * @param {Array<number>} input - Input features.
 * @returns {Promise<number>} Prediction score.
 */
const cluster = async (input) => {
  const model = buildClusteringModel();
  await model.fit(tf.tensor2d([[1, 2], [2, 3], [3, 4]]), tf.tensor2d([[0], [1], [1]]), { epochs: 50 });
  const prediction = model.predict(tf.tensor2d([input], [1, 2]));
  return prediction.arraySync()[0][0];
};

module.exports = { classify, cluster };
