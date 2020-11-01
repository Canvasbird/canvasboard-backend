const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")

// * ADDING TIMESTAMP FOR LAST_ACCESSED & LAST_MODIFIED *MAIN FUNCTION:[folder_id, is_modified => route /user/last-accessed]
exports.lastAccessedModifiedFile = async (req, res) =>{
    if(!req.body.is_modified){
        try { 
           await Files.findByIdAndUpdate(req.body.file_id, {$set:{
                last_accessed_on:Date.now(),
                file_url:req.body.file_url
            }}) 
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
    else {
        try { 
           await Files.findByIdAndUpdate(req.body.file_id, {$set:{
                last_accessed_on:Date.now(),
                last_modified_on:Date.now(),
            }}) 
            await minio.minioClient.putObject('files', req.file.originalname, req.file.buffer) 
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
}