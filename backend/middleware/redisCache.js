
// backend/middleware/redisCache.js

const redis = require('redis');
const client = redis.createClient();

/**
 * Middleware for caching API responses in Redis.
 * @param {string} key - Redis key to cache the data.
 */
const cache = (key) => (req, res, next) => {
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data) {
      res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, 3600, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = cache;
