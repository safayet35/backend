import express from "express";
import { login, logout ,changePassword} from "../controllers/admin.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyJwt, logout);
router.post("/change-password", verifyJwt, changePassword);
export default router;
