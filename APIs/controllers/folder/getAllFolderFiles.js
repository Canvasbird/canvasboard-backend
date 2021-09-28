const { Users, mongoose } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus");
const jwt = require("jsonwebtoken");

exports.getAllFolderFile = async (req, res) => {
	try {
		var userId = jwt.verify(req.get("X-AUTH-TOKEN"), process.env.JWT_SECRET_KEY);
		Users.aggregate([
			{ $match: { _id: mongoose.Types.ObjectId(userId.user_id) } },
			{
				$lookup: {
					from: "folders",
					localField: "folders",
					foreignField: "_id",
					as: "folders",
				},
			},
			{ $unwind: "$folders" },
			{
				$lookup: {
					from: "files",
					localField: "folders.files",
					foreignField: "_id",
					as: "files",
				},
			},
			{
				$project: {
					_id: "$folders._id",
					created_on: "$folders.created_on",
					files: "$files",
					folder_name: "$folders.folder_name",
					folder_title: "$folders.folder_title",
					folder_tag: "$folders.folder_tag",
					is_nested_folder: "$folders.is_nested_folder",
				},
			},
		]).exec((error, doc) => {
			if (error) res.status(500).json(httpStatus500(error));
			res.status(200).json(httpStatus200(null, doc));
		});
	} catch (error) {
		if (error) res.status(500).json(httpStatus500(error));
	}
};
