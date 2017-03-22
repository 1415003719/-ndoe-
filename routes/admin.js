var express = require('express');
var router = express.Router();
var adminhandler=require('./../handler/admhandler.js');
/* GET home page. */
router.get('/',adminhandler.renderAdminLoginPage);
router.get('/manage',adminhandler.renderAdminMainPage);
router.post('/logincheck',adminhandler.logincheck);
router.post('/addGoods',adminhandler.addGoods);
router.post('/xiajia',adminhandler.xiajia);
module.exports = router;
