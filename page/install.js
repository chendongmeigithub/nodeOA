var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('install', {title: 'Hey', message: 'Hello there!'});
});

//
router.post('/db', function (req, res, next) {
    var postData = req.body;
    var errObj = {
        status: 1000,
        data: {},
        message: '配置数据库异常'
    };
    fs.readFile('./config/config.json', 'utf-8', function (err, data) {
        if (err) {
            res.render('install', errObj);
        } else {
            if (data !== '') {
                errObj.status = 1001;
                res.render('install', errObj);
            } else {
                postData.insecureAuth = true;
                postData = JSON.stringify(postData);
                fs.writeFile('./config/config.json', postData, 'utf-8', function (err) {
                    if (err) {
                        errObj.status = 1002;
                        res.render('install', errObj);
                    } else {
                        res.redirect('/home');
                    }
                });
            }
        }
    });
});

module.exports = router;
