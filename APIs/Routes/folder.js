var express = require('express');
var router = express.Router();

const { isAuthenticated} = require('../middlewares/auth')

const { createFolder } = require("../controllers/folder/addFolder")
const { renameFolderAttributes } = require('../controllers/folder/renameFolder')
const { removeFolder } = require('../controllers/folder/removeFolder')
const { viewUserFolders } = require("../controllers/folder/viewFolders")

const { lastAccessedModified } = require("../controllers/folder/lastAccessedStamp")
const { createChildFolder } = require("../controllers/folder/addChildFolder")
const { removeChildFolder }  =require('../controllers/folder/removeChildFolder')
const { viewChildFolders } = require("../controllers/folder/viewChildFolders")

router.post("/user/create-folder", isAuthenticated, createFolder);
router.post("/user/rename-folder", isAuthenticated, renameFolderAttributes);
router.delete("/user/remove-folder", isAuthenticated, removeFolder)
router.get("/user/view-folders/:user_id", isAuthenticated, viewUserFolders);
router.post("/user/last-accessed", isAuthenticated, lastAccessedModified)

router.post("/user/create-nested-folder",  createChildFolder);
router.delete("/user/remove-nested-folder", isAuthenticated, removeChildFolder)
router.get("/user/view-nested-folders/:folder_id", isAuthenticated, viewChildFolders);

module.exports = router

