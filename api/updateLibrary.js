var request = require("request");
var connection = require('../db').pool;
var operation = require('./optLibrary');
var face = require('../config/face');

module.exports = function(req,res) {
    var postParms = face;
    if (typeof req.body.faceset_token !== 'undefined') {
        postParms.faceset_token = req.body.faceset_token;
        postParms.display_name = req.body.display_name || '人像库';
        postParms.user_data = req.body.tags || '';
        request({
            uri: "https://api-cn.faceplusplus.com/facepp/v3/faceset/update",
            method: "POST",
            form: postParms,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var options = {};
                options.libraryName = postParms.display_name || '人像库';
                options.libraryMarks = postParms.user_data || '';
                options.libraryToken = postParms.faceset_token;
                options.connection = connection;
                operation.updateLibrary(options).then((results) => {
                    console.log(results);
                    res.json({
                        rtn: 0,
                        message: 'OK',
                        results
                    });
                }).catch((err) => {
                    res.json(body);
                });
            }else {
                res.json({
                    rtn: -1,
                    message: '人像库更新失败'
                });
            }
        });
    } else {
        res.json({
            rtn: -1,
            message: '缺少必要参数(faceset_token)'
        });
    }
};