var express = require('express');
var multer = require("multer");
var router = express.Router();


// Controllers
var authCtrl = require('../controllers/authCtrl');
var boardCtrl = require('../controllers/boardCtrl');
var uploadCtrl = require('../controllers/uploadCtrl');


// Middlewares
var auth = require('../middlewares/auth');

//------------------------------------ Login/Register APIs ------------------------------------//

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/verify', authCtrl.verify);

//--------------------------------------- Board APIs -----------------------------------------//

router.get('/user/get/boards', auth.isAuthenticated, boardCtrl.getUserBoards);
router.get('/user/get/board', auth.isAuthenticated, boardCtrl.getUserBoardData);
router.post('/user/save/board', auth.isAuthenticated, boardCtrl.saveUserBoardData);

//--------------------------------------- File Handler APIs -----------------------------------------//

router.post('/upload/file',auth.isAuthenticated, multer({ storage: multer.memoryStorage() }).single("fileUploader"), uploadCtrl.uploadFile);
router.get('/download/file', uploadCtrl.downloadFile);
router.get('/download/folder',auth.isAuthenticated, uploadCtrl.getUserRoot);

module.exports = router;