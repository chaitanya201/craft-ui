import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

export const initRedis = async () => {
  redisClient = createClient();
  await redisClient.connect();
  console.log("redis connected");
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis client is not initialized.");
  }
  return redisClient;
};

export const disconnectRedis = async () => {
  if (!redisClient) {
    throw new Error("Redis client is not initialized.");
  }
  await redisClient.disconnect();
};
