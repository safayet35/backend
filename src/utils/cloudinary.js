import { v2 as cloudinary } from "cloudinary";
import _config from "../config.js";
import fs from "fs";

const uploadOnCloudinary = async localFilePath => {
	cloudinary.config({
		cloud_name: _config.cloudinary_cloud_name,
		api_key: _config.cloudinary_api_key,
		api_secret: _config.cloudinary_api_secret
	});
	try {
		if (!localFilePath) return null;
		// upload file on cloudinary

		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto"
		});

		// file has been uploaded successfully
		// console.log("file uploaded", response.url);
		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		fs.unlinkSync(localFilePath);
		console.log("upload error", error);
		return null;
	}
};

export { uploadOnCloudinary };
