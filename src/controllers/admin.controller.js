import Admin from "../models/admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
	uploadOnCloudinary
} from "../utils/cloudinary.js";
const generateAccessAndRefreshToken = async userId => {
	try {
		const user = await Admin.findById(userId);

		const accessToken = user.generateAccessToken();

		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });
		return { accessToken, refreshToken };
	} catch (e) {
		throw new ApiError(
			404,
			"Something went wrong while generating access and refresh token"
		);
	}
};

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(401, "All fields are required");
	}
	const user = await Admin.findOne({ email });

	const isCorrectPass = await user.isCorrectPassword(password);

	if (!isCorrectPass) {
		throw new ApiError(402, "Invalid credentials ");
	}
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	);

	const filterUser = await Admin.findById(user._id).select(
		"-password -refreshToken "
	);
	return res
		.status(200)
		.cookie("accessToken", accessToken)
		.cookie("refreshToken", refreshToken)
		.json(new ApiResponse(200, filterUser, "Login successfully"));
});

const logout = asyncHandler(async (req, res) => {
	const userId = req.user;
	console.log(userId);
	const user = await Admin.findByIdAndUpdate(
		userId,
		{
			$set: {
				refreshToken: ""
			}
		},
		{ new: true }
	);

	res
		.status(200)
		.clearCookie("accessToken")
		.clearCookie("refreshToken")
		.json(new ApiResponse(200, "Logout successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
	const { oldPass, newPass } = req.body;
	const userId = req.user._id;
	if (!oldPass || !newPass) {
		throw new ApiError(400, "All fileds are required");
	}
	const user = await Admin.findById(userId);

	const isCorrectPass = await user.isCorrectPassword(oldPass);

	if (!isCorrectPass) {
		throw new ApiError(401, "Invalid password");
	}

	user.password = newPass;
	await user.save();
	res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});

const uploadProfileImage = asyncHandler(async (req, res) => {
	const imageLocalPath = req.file.path;

	if (!imageLocalPath) {
		throw new ApiError(400, "Image is required ");
	}
	const response = await uploadOnCloudinary(imageLocalPath);

	if (!response?.url) {
		throw new ApiError(401, "Invalid file ");
	}

	const userId = req.user._id;

	const newUser = await Admin.findByIdAndUpdate(
		userId,
		{
			$set: {
				profileImage: response.url
			}
		},
		{ new: true }
	);
	res.send(newUser);
});



export { login, logout, changePassword, uploadProfileImage };
