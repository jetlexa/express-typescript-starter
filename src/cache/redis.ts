import redis from "redis";

const redisClient = redis.createClient(process.env.REDIS_PORT);
export const set = (key, value) => {
  // setting to in memory cache with key (key will be route)
  // EXPIRES IN 24 hrs
  redisClient.setex(
    key,
    parseInt(process.env.REDIS_EXP) || 60 * 60 * 24,
    JSON.stringify(value)
  );
};

export const get = (req, res, next) => {
  let key = req.route.path;
  // getting from in memory cache with key
  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(error);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};
