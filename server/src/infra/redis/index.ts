import { Redis as UpstashRedis } from "@upstash/redis";
import { env } from "../../utils/env";

const redis = new UpstashRedis({
  url: env.UPSTASH_REDIS_REST_URL!,
  token: env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
