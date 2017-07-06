var install = require('../page/install'); // 配置数据库信息
var api = require('../api/api'); // api接口
var users = require('../page/users'); // 配置数据库信息
var home = require('../page/home'); // api接口


module.exports = function (app, io) {
    io.on('connection', function(socket) {
        socket.emit('news', {"name": 123123});
        socket.on('my other event', function (data) {
            console.log('my other event',data,'my other event');
        });
    });
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use('/users', users);
    app.use('/home', home);
    app.use('/install', install);
    app.use('/api', api);
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};
