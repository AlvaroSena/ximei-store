import { createClient } from "redis";

const redisLocalClient = createClient({
  url: process.env.REDIS_URL!,
});

redisLocalClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  if (!redisLocalClient.isOpen) {
    await redisLocalClient.connect();
  }
})();

export default redisLocalClient;
