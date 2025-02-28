import express, { json } from "express";
import "dotenv/config";
import { BookerDataSource } from "./global/database/dataSource.js";
import {redisClient} from "./global/database/redis.js";
import authRouter from "./domain/auth/router/authRouter.js";
import userRouter from "./domain/user/router/userRouter.js";
import libraryRouter from "./domain/library/router/libraryRouter.js";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.use(authRouter);
app.use(userRouter);
app.use(libraryRouter);

BookerDataSource.initialize()
  .then(async () => {
    console.log("Database connection established");
    
    await redisClient.connect().then(() => console.log("redis connection established"));
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));
