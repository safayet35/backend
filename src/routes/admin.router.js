import express from "express";
import { login, logout } from "../controllers/admin.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyJwt, logout);
export default router;
