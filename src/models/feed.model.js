import mongoose from "mongoose";
const feedSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ timestamps: true }
);

const Feed = mongoose.model("Feed", feedSchema);

export default Feed
