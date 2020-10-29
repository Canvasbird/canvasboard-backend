const {  Folders, Files } = require("../../models/db");
var minio = require('../../config/minio');

const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")

// * CREATE FILE *MAIN FUNCTION
exports.createFile = async (req, res) => {
    try {
        const file = await new Files({
            file_name:req.body.file_name,
            file_tag:req.body.file_tag
        })
        try {
            const {_id} = await file.save()
            try {
                const rootFolder = await Folders.findById(req.body.folder_id)
                try {
                    try {
                        await minio.minioClient.putObject('files', _id, req.file.buffer)
                        try {
                            const result = await rootFolder.addChildFile(_id)
                            res.status(200).json(httpStatus200(result))
                        } catch (error) {
                            if(error) res.status(500).json(httpStatus500(error))
                        }
                    } catch (error) {
                        if(error) res.status(500).json(httpStatus500(error))
                    }
                } catch (error) {
                    if(error) res.status(500).json(httpStatus500(error))
                }
            } catch (error) {
                if(error) res.status(500).json(httpStatus500(error))
            }
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}

