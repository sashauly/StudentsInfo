import NodeCache from 'node-cache';

const cache = new NodeCache();

export default (duration) => (req, res, next) => {
  if (req.method !== 'GET') {
    console.log('Cannot cache non-GET methods!');
    // Clear cache on POST, PUT, DELETE of the same route
    if (cache.has(req.originalUrl)) {
      console.log('Cache cleared');
      cache.del(req.originalUrl);
    }
    return next();
  }
  // check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  // if it exists, send cache results
  if (cachedResponse) {
    console.log(`Cache hit for ${key}`);
    res.json(cachedResponse);
  } else {
    // if not, replace .send with method to set response to cache
    console.log(`Cache miss for ${key}`);
    res.originalJson = res.json;
    res.json = (body) => {
      res.originalJson(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
