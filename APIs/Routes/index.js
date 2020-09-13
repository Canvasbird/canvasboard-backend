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

//--------------------------------------- Board APIs -----------------------------------------//

router.get('/user/get/boards', auth.isAuthenticated, boardCtrl.getUserBoards);
router.post('/user/save/board', auth.isAuthenticated, boardCtrl.saveUserBoardData);

//--------------------------------------- Board APIs -----------------------------------------//

router.post('/upload/file', multer({ storage: multer.memoryStorage() }).single("fileUploader"), uploadCtrl.uploadFile);
router.get('/download/file', uploadCtrl.downloadFile);

module.exports = router;