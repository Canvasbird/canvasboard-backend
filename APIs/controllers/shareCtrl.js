var minio = require('../config/minio');
var fs = require('fs');
var path = require('path');
var db = require("../models/db");


function shareFile(req, res) {

    try {

        var user_id = req.token.user_id;

        db.Users.findOne({
            _id: db.mongoose.Types.ObjectId(user_id),
        }, (err, user) => {

            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (user) {
                var file_name = req.query.fileName;
                if(!file_name){
                    return res.status(500).json({
                        success: false,
                        message: "Provide File to Share"
                    });
                }
                //check ownership of file
                file_owner = file_name.split("/")[0]
                if(file_owner===user_id){
                    var shared_file = {
                        filepath : file_name,
                        fileowner : user_id
                    }
                    var shared_obj = new db.SharedFiles(shared_file);

                    shared_obj.save().then((sharedFile) => {
                        var file_obj = {
                            filepath: sharedFile.filepath,
                            fileowner: sharedFile.fileowner,
                            accessUrl: "/api/v1/share/getfile/"+sharedFile._id
                        }
                        console.log(file_obj)
                        return res.status(200).json(file_obj)
                    }).catch((err) => {
                        if (err.code === 11000) {
                            db.SharedFiles.findOne({filepath:file_name}, (err, shared_file) => {
                                if (err){
                                    return res.status(500).json({
                                        success: false,
                                        message: "Something Went Wrong!"
                                    });
                                }
                                var file_obj = {
                                    filepath: shared_file.filepath,
                                    fileowner: shared_file.fileowner,
                                    accessUrl: "/api/v1/share/getfile/"+shared_file._id
                                }
                                console.log(file_obj)
                                return res.status(200).json(file_obj)
                            })
                        }
                        else{
                            return res.status(500).json({
                                success: false,
                                message: "Something Went Wrong: "+ err.code
                            });
                        }
                        
                    })
                }
                else {
                    return res.status(500).json({
                        success: false,
                        message: "Unauthorized Request"
                    });
                }
               
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                });
            }

        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong!: ${err.message}`,
        });
    }
}
function listUserSharedFiles(req,res){
    try {

        var user_id = req.token.user_id;

        db.SharedFiles.find({
            fileowner: db.mongoose.Types.ObjectId(user_id),
        }, (err, files) => {

            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            shared_files = []
            files.forEach(async f => {
                await shared_files.push({filepath: f.filepath, fileowner: f.fileowner, accessUrl: "/api/v1/share/getfile/"+f._id})
            });
            return res.status(200).json(shared_files)
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong!: ${err.message}`,
        });
    }
}

function getSharedFile(req, res) {

    try {

        if (!req.params.file) {
            res.status(500).json({
                success: false,
                message: "Invalid File id"
            });
            return;
        }
        var file_id = req.params.file
        db.SharedFiles.findById(file_id, (err, sharedFile) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid File id"
                });
            }
            else{
                if(sharedFile){
                    var  file_name = sharedFile.filepath;
                    minio.minioClient.getObject('files', file_name, function (err, stream) {

                        if (err) {
                            console.error(err);
            
                            if (err.message == "The specified key does not exist.") {
                                err.message = "File not found."
                            }
            
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }
            
                        stream.pipe(res).on('finish', () => {
                            console.log(`File served`);
                        });
            
                    });

                }else{
                    return res.status(500).json({
                        success: false,
                        message: "Invalid File id"
                    });
                }
                
            }
        })
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}


module.exports = {
    shareFile,
    getSharedFile,
    listUserSharedFiles
}