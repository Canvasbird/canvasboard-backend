var express = require('express');
var router = express.Router();


// Controllers
var auth = require('../controllers/auth');


// Middlewares
var auth_middleware = require('../middlewares/auth');
const { worker } = require('cluster');

//------------------------------------ Login/Register APIs ------------------------------------//

router.post('/login', auth.login);
router.post('/register', auth.register);



module.exports = router;