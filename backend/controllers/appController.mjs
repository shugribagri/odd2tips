import redisClient from "../utils/redis.mjs";

class AppController {
  static async getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    // const dbStatus = dbClient.isAlive();
    response.set("Content-Type", "application/json");
    response.status(200).json({ redis: redisStatus }).end();
  }
}

export default AppController;
