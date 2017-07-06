var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    req.io.on('connection', function(socket) {
        socket.emit('news', req.body);
    });
    res.render('index');
});

module.exports = router;
