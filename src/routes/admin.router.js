import express from "express";
import {
	login,
	logout,
	changePassword,
	uploadProfileImage
} from "../controllers/admin.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();


router.post("/login", login);
router.post("/logout", verifyJwt, logout);
router.patch("/change-password", verifyJwt, changePassword);
router.post(
	"/upload-profile-image",
	verifyJwt,
	upload.single("profileImage"),
	uploadProfileImage
);

export default router;
