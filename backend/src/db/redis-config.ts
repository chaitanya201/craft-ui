import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

export const initRedis = async () => {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD,
  });
  redisClient.on("error", (err) => {
    console.log("error while connecting redis");
    throw err;
  });
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
