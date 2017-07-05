module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use('/users', require('./users'));
    app.use('/home', require('../page/home'));
    app.use('/install', require('../page/install'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};
