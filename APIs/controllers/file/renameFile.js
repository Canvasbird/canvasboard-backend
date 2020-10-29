const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")

// * RENAME FILE_NAME, & TAG *MAIN FUNCTION
exports.renameFileAttributes = async (req, res) =>{
    try {
        await Files.findByIdAndUpdate(req.body.file_id, {
            $set:{
                file_name:req.body.file_name,
                file_tag:req.body.file_tag
            }
        })
        res.status(200).json(httpStatus200("File Renamed!"))
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}