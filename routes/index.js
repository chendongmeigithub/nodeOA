var install = require('../page/install'); // 配置数据库信息
var api = require('../api/api'); // api接口
var users = require('../page/users'); // 配置数据库信息
var home = require('../page/home'); // api接口
var socket = require('../config/socket'); // 配置wbsocket



module.exports = function (app, io) {
    socket(io);
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
