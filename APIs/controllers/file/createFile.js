const {  Folders, Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")
const minio = require('../../config/minio')

exports.createFile = async (req, res) => {
    try {

        const file = await new Files({
            file_name:req.body.file_name,
            file_tag:req.body.file_tag
        })
            
        const {_id} = await file.save()
        const file_url = _id + req.file.originalname

        try {

            const rootFolder = await Folders.findById(req.body.folder_id)
            const createdFile = await rootFolder.addChildFile(_id)
            await minio.minioClient.putObject('files', file_url, req.file.buffer) 
            res.status(200).json(httpStatus200(createdFile, "File Created"))

            } catch (error) {
                if(error) res.status(500).json(httpStatus500(error))
            }

    } catch (error) {
        if(error) res.status(500).json(httpStatus500(error))
    }
}

