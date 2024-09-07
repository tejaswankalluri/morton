import express from "express";
const router = express.Router();
import v1Router from "./v1/index.js";

router.get("/health", (req, res) => {
  res.send({ message: "ok" });
});

router.use("/api/v1", v1Router);

export default router;
