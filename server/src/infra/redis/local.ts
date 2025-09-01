import { createClient } from "redis";
import { env } from "../../utils/env";

const redisLocalClient = createClient({
  url: env.REDIS_URL!,
});

redisLocalClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  if (!redisLocalClient.isOpen) {
    await redisLocalClient.connect();
  }
})();

export default redisLocalClient;
