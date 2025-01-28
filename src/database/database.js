import mongoose from "mongoose";
import _config from "../config.js";

const connectDb = async () => {
	try {
		await mongoose.connect(_config.mongodb_uri);
		console.log("MongoDb database connected successfully");
	} catch (e) {
		console.log("MongoDb connection error", e);
		process.exit(1);
	}
};

export default connectDb;
