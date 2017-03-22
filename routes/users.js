var express = require('express');
var router = express.Router();
var db=require('./../db/db');
var userhandler=require('./../handler/userhandler.js');
/* GET users listing. */
router.get('/',userhandler.getIndex);
router.get('/userLogin',userhandler.renderUserLogin);
router.get('/register',userhandler.renderUserLoginPage);
router.post('/checkRegister',userhandler.checkRegister);
router.get('/registerOk',userhandler.registerOk);
router.get('/userInfo',userhandler.renderUserInfo);
router.post('/checkLogin',userhandler.checkLogin);
router.get('/logoff',userhandler.userlogOff);
router.post('/getPayInfo',userhandler.getPayInfo);
router.post('/checkUpdate',userhandler.checkUpdate);
module.exports = router;
