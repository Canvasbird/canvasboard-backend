const { Files, Folders } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")

// * REMOVE FILES *MAIN FUNCTION
exports.removeFile = async (req, res)=>{
    try {
        await Files.findByIdAndDelete(req.body.file_id)
        try {
            const rootFolder= await Folders.findById(req.body.folder_id)
            const message = await rootFolder.removeFileReference(req.body.file_id)
            res.status(200).json(httpStatus200(null, message))
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    } catch (error) {
      if(error) res.status(500).json(httpStatus500(error))
    }
}