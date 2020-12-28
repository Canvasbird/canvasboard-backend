var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { createFile } = require("../controllers/file/createFile");
const { renameFileAttributes } = require("../controllers/file/renameFile");
const { removeFile } = require("../controllers/file/removeFile");
const { viewFiles } = require("../controllers/file/viewFiles");
const { viewFile } = require("../controllers/file/viewFile")
const { editFileData } = require('../controllers/file/editFile')
const { editFileTags } = require('../controllers/file/editTags')

// * --------------------------- File Routes ------------------------------------ //
router.post("/user/folder/create-file", isAuthenticated, createFile);
router.post("/user/folder/rename-file", isAuthenticated, renameFileAttributes);
router.post("/user/folder/edit-file", isAuthenticated, editFileData);
router.post("/user/folder/edit-file-tag", isAuthenticated, editFileTags);

router.get("/user/folder/files/:folder_id", isAuthenticated, viewFiles);
router.get("/user/files/:file_id", isAuthenticated, viewFile);
router.delete("/user/folder/remove-file", isAuthenticated, removeFile);

module.exports = router;