import mongoose from "mongoose";
const projectSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	projectType: {
		type: String,
		required: true,
		trim: true
	},
	projectLink: {
		type: String,
		required: true,
		trim: true
	},
	coverImage: {
		type: String, // from cloudinary
		required: true,
		trim: true
	}
},	{ timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project