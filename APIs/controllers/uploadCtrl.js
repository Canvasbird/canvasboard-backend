var minio = require('../config/minio');
var fs = require('fs');
var path = require('path');
var db = require("../models/db");


function uploadFile(req, res) {

    try {

        var user_id = req.token.user_id;
        if (!req.query.path) {
            res.status(500).json({
                success: false,
                message: "path is required"
            });
            return;
        }
        var path  =  req.query.path
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
                var file_name = user_id + "/" + Date.now() + '_' + req.file.originalname;
                minio.minioClient.putObject('files', file_name, req.file.buffer, function (err, file) {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: `Something went wrong!: ${err.message}`
                        });
                    }

                    if (file) {
                        if(path==="/"){
                            db.Users.findByIdAndUpdate(user_id,{ $addToSet: { root_files: [file_name] } },(err,folder) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({
                                        success: false,
                                        message: err.message
                                    });
                                }
                                return res.status(200).json({
                                    success: true,
                                    message: "File Successfully Uploaded",
                                    originalname: req.file.originalname,
                                    file_url: file_name,
                                    folder:folder
                                });
                            })
                        }
                        else{
                            db.FolderObjects.findByIdAndUpdate(path,{lastAccessedOn: Date.now(), lastModifiedOn: Date.now(), $addToSet: { files: [file_name] } },(err,folder) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({
                                        success: false,
                                        message: err.message
                                    });
                                }
                                return res.status(200).json({
                                    success: true,
                                    message: "File Successfully Uploaded",
                                    originalname: req.file.originalname,
                                    file_url: file_name,
                                    folder:folder
                                });
                            }) 
                        }
                                              

                    }
                    else {
                        return res.status(500).json({
                            success: false,
                            message: "Someting Went Wrong, Please try again later"
                        });
                    }

                });
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

function downloadFile(req, res) {

    try {

        if (!req.query.file_url) {
            res.status(500).json({
                success: false,
                message: "file_url is not passed"
            });
            return;
        }

        minio.minioClient.getObject('files', req.query.file_url, function (err, stream) {

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

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}
function addFolder(req,res) {
    try{
        var user_id = req.token.user_id;
        if (!req.body.parent) {
            res.status(500).json({
                success: false,
                message: "parent is required"
            });
            return;
        }
        if (!req.body.title) {
            res.status(500).json({
                success: false,
                message: "title is required"
            });
            return;
        }
        db.Users.findById(user_id, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            if (user) {
                let parent = req.body.parent;
                if(parent !== "/"){
                    db.FolderObjects.findByIdAndUpdate(parent, {lastAccessedOn: Date.now(), lastModifiedOn: Date.now()}, (err, parent_folder) => {
                        if(err){
                            console.error(err);
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }
                        if(!parent_folder){
                            return res.status(500).json({
                                success: false,
                                message: "No path to folder"
                            });
                        }
                    })
                }
                if(parent==="/"){
                    parent=user_id;
                }
                let title = req.body.title;
                let tags = req.body.tags;
                let color = req.body.color;
                let subtitle  = req.body.subtitle;
                let new_folder = {
                    title: title,
                    tags: tags,
                    color: color,
                    subtitle: subtitle,
                    parent:  parent,
                    owner: user_id
                }
                var folder_obj = new db.FolderObjects(new_folder);
                folder_obj.save((err, data) => {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                    if(req.body.parent === "/"){
                        db.Users.findByIdAndUpdate(user_id,{ $addToSet: { root_folders: [data._id] } },(err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                message: "Folder Created Successfully",
                                folder: data,
                            });
                        })
                    }else{
                        db.FolderObjects.findByIdAndUpdate(parent,{ $addToSet: { childFolders: [data._id] } },(err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                message: "Folder Created Successfully",
                                folder: data,
                            });
                        })
                    }
                })                
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                });
            }
        })
    }
    catch  (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong!: ${err.message}`,
        });
    }
    
}
function listFolder(req,res){
    try{
        var user_id = req.token.user_id;
        if (!req.query.path) {
            res.status(500).json({
                success: false,
                message: "path is required"
            });
            return;
        }
        db.Users.findById(user_id, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            if (user) {
                let path = req.query.path;
                if(path==="/"){
                    path = user_id
                    db.Users.findById(user_id, async (err,folders) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }
                        let listFolders = []
                        for(f in folders.root_folders) {
                            let _f = await db.FolderObjects.findById(folders.root_folders[f])
                            listFolders.push({ id: _f._id, color: _f.color, title: _f.title, subtitle: _f.subtitle, tags: _f.tags, createdOn: _f.createdOn, lastAccessedOn: _f.lastAccessedOn, lastModifiedOn: _f.lastModifiedOn });
                        }
                        return res.json({folders: listFolders, files: folders.root_files})
                    })
                }
                else{
                    db.FolderObjects.findByIdAndUpdate(path,{lastAccessedOn: Date.now()},async (err,parent_folder) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }
                        let listFolders = []
                        for(f in parent_folder.childFolders) {
                            let _f = await db.FolderObjects.findById(parent_folder.childFolders[f])
                            listFolders.push({ id: _f._id, color: _f.color, title: _f.title, subtitle: _f.subtitle, tags: _f.tags, createdOn: _f.createdOn, lastAccessedOn: _f.lastAccessedOn, lastModifiedOn: _f.lastModifiedOn });
                        }
                        return res.json({folders: listFolders, files: parent_folder.files})
                    })
                }
            }
        })
    }
    catch  (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong!: ${err.message}`,
        });
    }
}

module.exports = {
    uploadFile,
    downloadFile,
    addFolder,
    listFolder,
}