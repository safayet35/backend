import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
	const token = req.cookies("accessToken") || req.headers;
	if (!token) {
	   
	}
};
