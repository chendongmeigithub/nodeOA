var install = require('../page/install'); // 配置数据库信息
var api = require('../api/api'); // api接口



module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use('/users', require('../page/users'));
    app.use('/home', require('../page/home'));
    app.use('/install', install);
    app.use('/api', api);
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};
