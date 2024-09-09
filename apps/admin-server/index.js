import express from "express";
import config from "./src/config/config.js";
import morgan from "morgan";
import helmet from "helmet";
import { db, dbSync } from "./db.js";
import cookieParser from "cookie-parser";
import router from "./src/router/index.js";
// import * as cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

dbSync();

app.post("/", async (req, res) => {
  try {
    console.log(req.cookies);
    const result = await db.query.user.findMany({});
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.use("/", router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message,
  });
});

app.listen(config.SERVER_PORT, () => {
  console.log(`server running port ${config.SERVER_PORT}`);
});
