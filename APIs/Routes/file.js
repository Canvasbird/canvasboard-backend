var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { createFile } = require("../controllers/file/createFile");
const { renameFileAttributes } = require("../controllers/file/renameFile");
const { removeFile } = require("../controllers/file/removeFile");
const { viewFiles } = require("../controllers/file/viewFiles");

// * File Routes

router.post("/user/folder/create-file", isAuthenticated, createFile);
router.post("/user/folder/rename-file", isAuthenticated, renameFileAttributes);
router.get("/user/folder/files/:folder_id", isAuthenticated, viewFiles);
router.delete("/user/folder/remove-file", isAuthenticated, removeFile);

module.exports = router;
