import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// test redis
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((error: any) => {
    console.error("Redis connection error:", error);
  });

  
