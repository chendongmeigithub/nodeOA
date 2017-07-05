var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('install', {title: 'Hey', message: 'Hello there!'});
});


// POST /posts/:postId/edit 更新一篇文章
router.post('/db', function (req, res, next) {
    var errObj = {
        status: 1000,
        data: {},
        message: '配置数据库异常'
    };
    fs.readFile('./config/config.json', 'utf-8', function (err, data) {
        if (err) {
            res.render('install', errObj);
        } else {
            data = JSON.parse(data);
            if (typeof data.host !== 'undefined') {
                errObj.status = 1001;
                res.render('install', errObj);
            } else {
                data.insecureAuth = true;
                data = JSON.stringify(data);
                fs.writeFile('./config/config.json', data, 'utf-8', function (err) {
                    if (err) {
                        errObj.status = 1002;
                        res.render('install', errObj);
                    } else {
                        res.render('home');
                    }
                });
            }
        }
    });
    // var postId = req.params.postId;

    // { host: '123',
    //     user: '123',
    //     password: '123',
    //     port: '3306',
    //     database: '12323' }
    console.log(req.body);
});

module.exports = router;
