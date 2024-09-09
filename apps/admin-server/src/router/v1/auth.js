import express from "express";
import {
  loginUser,
  me,
  registerUser,
} from "../../controller/auth/auth.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", me);

export default router;
