var express = require('express');
var router = express.Router();
var multer = require("multer");

const { isAuthenticated} = require('../middlewares/auth')

const { createFile } = require('../controllers/file/createFile')
const { renameFileAttributes } = require('../controllers/file/renameFile')
const { removeFile } = require('../controllers/file/removeFile')
const { lastAccessedModifiedFile } = require('../controllers/file/lastAccessFile')
const { viewFiles } = require('../controllers/file/viewFiles')

router.post("/user/folder/create-file", isAuthenticated, multer({ storage: multer.memoryStorage() }).single("file_url"), createFile);
router.post("/user/folder/rename-file", isAuthenticated, renameFileAttributes)
router.get("/user/folder/files/:folder_id", isAuthenticated, viewFiles);
router.delete("/user/folder/remove-file", isAuthenticated, removeFile)
router.post("/user/folder/last-accessed-file", 

                        isAuthenticated, 
                        multer({ storage: multer.memoryStorage() }).single("file_url"), 
                        lastAccessedModifiedFile
            )

module.exports = router