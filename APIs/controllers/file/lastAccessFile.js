const { Files } = require("../../models/db");
const { httpStatus200, httpStatus500 } = require("../../status/httpStatus")
const minio = require('../../config/minio')

exports.lastAccessedModifiedFile = async (req, res) =>{
    if(!req.body.is_modified){
        try { 
           await Files.findByIdAndUpdate(req.body.file_id, {$set:{
                last_accessed_on:Date.now(),
            }}) 
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
    else {
        try { 
            console.log(req.file)
           await Files.findByIdAndUpdate(req.body.file_id, {$set:{
                last_accessed_on:Date.now(),
                last_modified_on:Date.now(),
                file_url:req.file.originalname
            }}) 
            await minio.minioClient.putObject('files', req.file.originalname, req.file.buffer) 
            res.status(200).json(httpStatus200())
        } catch (error) {
            if(error) res.status(500).json(httpStatus500(error))
        }
    }
}