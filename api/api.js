var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    res.io.emit("news", req.body);
    // console.log( req.io.sockets);
    // req.io.sockets.on('connection', function(socket) {
    //     socket.on('news', function(msg) {
    //         socket.broadcast.emit('news', msg);
    //     });
    // });
    res.redirect('/api');
});

module.exports = router;
