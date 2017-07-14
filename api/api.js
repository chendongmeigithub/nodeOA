var express = require('express');
var router = express.Router();

var getLibrary = require('./getLibrary');// 获取人像库
var deleteLibrary = require('./deleteLibrary');// 获取人像库
var addLibrary = require('./addLibrary');// 获取人像库
var updateLibrary = require('./updateLibrary');// 更新人像库信息

var addface = require('./addface');// 向指定人像库中添加人像
// var deleteface = require('./deleteface');// 在指定人像库中删除指定人像




/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/', function (req, res, next) {
    res.io.emit("news", req.body);
    // console.log( req.io.sockets);
    // req.io.sockets.on('connection', function(socket) {
    //     socket.on('news', function(msg) {
    //         socket.broadcast.emit('news', msg);
    //     });
    // });
    res.redirect('/api');
});

// 处理人像库
router.get('/getLibrary', function (req, res, next) {
    new getLibrary(req,res)
});
router.delete('/deleteLibrary', function (req, res, next) {
    new deleteLibrary(req,res)
});
router.post('/addLibrary', function (req, res, next) {
    new addLibrary(req,res)
});
router.post('/updateLibrary', function (req, res, next) {
    new updateLibrary(req,res)
});

// 图片处理
router.post('/addface', function (req, res, next) {
    new addface(req,res)
});


module.exports = router;
