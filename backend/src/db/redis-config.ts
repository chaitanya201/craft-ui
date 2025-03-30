import Redis from "ioredis";

let redisClient: Redis;

export const initRedis = async () => {
  redisClient = new Redis();
  console.log("Redis connected");
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error("Redis client is not initialized.");
  }
  return redisClient;
};

export const disconnectRedis = async () => {
  if (!redisClient) {
    throw new Error("Redis client is not initialized.");
  }
  await redisClient.quit();
};
