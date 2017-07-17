var express = require('express');
var router = express.Router();

var getLibrary = require('./getLibrary');// 获取人像库
var deleteLibrary = require('./deleteLibrary');// 获取人像库
var addLibrary = require('./addLibrary');// 获取人像库
var updateLibrary = require('./updateLibrary');// 更新人像库信息

var addface = require('./addFace');// 向指定人像库中添加人像
var deleteface = require('./deleteFace');// 在指定人像库中删除指定人像

var faceCompare = require('./faceCompare');// 人像比对


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index');
});

// 门禁
router.post('/entrance', function (req, res, next) {
    console.log(req);
    res.io.emit("entrance", req.body);
    // console.log( req.io.sockets);
    // req.io.sockets.on('connection', function(socket) {
    //     socket.on('news', function(msg) {
    //         socket.broadcast.emit('news', msg);
    //     });
    // });

    res.json({
        rtn: 1,
        message: 'ws',
        data: req.body
    });
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
router.delete('/deleteface', function (req, res, next) {
    new deleteface(req,res)
});

// 人像比对
router.post('/faceCompare', function (req, res, next) {
    new faceCompare(req,res)
});


module.exports = router;
