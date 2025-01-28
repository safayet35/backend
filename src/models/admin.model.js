import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import _config from "../config.js";
import jwt from "jsonwebtoken"
const adminSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		fullName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		profileImage: {
			type: String, // from cloudinary
			default: ""
		},
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message"
			}
		],
		feedPost: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Feed"
			}
		],
		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Project"
			}
		],
		refreshToken: {
			type: String,
			default: ""
		}
	},
	{ timestamps: true }
);

adminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	return next();
});

adminSchema.methods.isCorrectPassword = async function (password) {
	const isCorrect = await bcrypt.compare(password, this.password);
	return isCorrect;
};

adminSchema.methods.generateAccessToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
			password: this.password,
			email: this.email
		},
		_config.access_token_secret,
		{
			expiresIn: _config.access_token_expiry
		}
	);
	return token;
};
adminSchema.methods.generateRefreshToken = function () {
	const token = jwt.sign(
		{
			_id: this._id
		},
		_config.refresh_token_secret,
		{
			expiresIn: _config.refresh_token_expiry
		}
	);
	return token;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
