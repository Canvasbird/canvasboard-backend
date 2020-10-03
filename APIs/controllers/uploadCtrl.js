var minio = require('../config/minio');
var fs = require('fs');
var path = require('path');
var db = require("../models/db");


function uploadFile(req, res) {

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

                        return res.status(200).json({
                            success: true,
                            message: "File Successfully Uploaded",
                            originalname: req.file.originalname,
                            file_url: file_name
                        });

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


module.exports = {
    uploadFile,
    downloadFile
}