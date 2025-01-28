import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import _config from "../config.js";
import Admin from "../models/admin.model.js";
const verifyJwt = async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, _config.access_token_secret);

		const user = Admin.findById(decodedToken._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new ApiError(400, "Invalid token or token expired");
		}
		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, "Invalid access token you need to login first");
	}
};


export default verifyJwt