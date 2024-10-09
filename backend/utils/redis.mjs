import { createClient } from "redis";
import { promisify } from "util";

const RedisClient = class RedisClient {
  constructor() {
    this.myClient = createClient({
      url: process.env.REDIS_URL,
      legacyMode: true,
    });
    this.myClient.on("error", (error) => {
      console.error("Redis Error:", error);
    });
  }

  isAlive() {
    return this.myClient.connected;
  }

  async get(key) {
    try {
      const getAsync = promisify(this.myClient.GET).bind(this.myClient);
      return await getAsync(key);
    } catch (error) {
      throw new Error(`Redis GET error: ${error}`);
    }
  }

  async set(key, val, time) {
    try {
      const setAsync = promisify(this.myClient.SET).bind(this.myClient);
      return await setAsync(key, val, "EX", time);
    } catch (error) {
      throw new Error(`Redis SET error: ${error}`);
    }
  }

  async del(key) {
    try {
      const delAsync = promisify(this.myClient.DEL).bind(this.myClient);
      return await delAsync(key);
    } catch (error) {
      throw new Error(`Redis DEL error: ${error}`);
    }
  }

  async setTwitterAuth(url, codeVerifier, state) {
    try {
      await this.set("twitterAuth:url", url, 300);
      await this.set("twitterAuth:codeVerifier", codeVerifier, 300);
      await this.set("twitterAuth:state", state, 300);
    } catch (error) {
      throw new Error(`Redis SET error for Twitter auth: ${error}`);
    }
  }

  async getTwitterAuth() {
    try {
      const url = await this.get("twitterAuth:url");
      const codeVerifier = await this.get("twitterAuth:codeVerifier");
      const state = await this.get("twitterAuth:state");
      return { url, codeVerifier, state };
    } catch (error) {
      throw new Error(`Redis GET error for Twitter auth: ${error}`);
    }
  }
};

const redisClient = new RedisClient();

export default redisClient;
