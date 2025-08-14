import { createClient } from "redis";
import { Redis as UpstashRedis } from "@upstash/redis";

let redis: any;

if (process.env.NODE_ENV === "production") {
  redis = new UpstashRedis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
} else {
  const localClient = createClient({
    url: process.env.REDIS_URL!,
  });

  localClient.on("error", (err) => console.error("Redis Client Error", err));

  (async () => {
    if (!localClient.isOpen) {
      await localClient.connect();
    }
  })();

  redis = localClient;
}

export default redis;
