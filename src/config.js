import dotenv from "dotenv";
dotenv.config();

const _config = {
	port: process.env.PORT,
	mongodb_uri: process.env.DATABASE_URI,
	cors_origin: process.env.CORS_ORIGIN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
	refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
	cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};

export default _config