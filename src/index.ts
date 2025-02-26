import express, { json } from "express";
import "dotenv/config";
import { BookerDataSource } from "./global/database/dataSource.js";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript & ESM!");
});

BookerDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));
