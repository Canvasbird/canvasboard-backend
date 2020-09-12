var express = require('express');
var router = express.Router();


// Controllers
var authCtrl = require('../controllers/authCtrl');
var boardCtrl = require('../controllers/boardCtrl');


// Middlewares
var auth = require('../middlewares/auth');
const { worker } = require('cluster');

//------------------------------------ Login/Register APIs ------------------------------------//

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

//------------------------------------ Board APIs ------------------------------------//

router.get('/user/get/boards', boardCtrl.getUserBoards);
router.post('/user/save/board', boardCtrl.saveUserBoardData);


module.exports = router;