var request = require("request");
var connection = require('../db').pool;
var operation = require('./optLibrary');
var face = require('../config/face');

module.exports = function(req,res) {
    var postParms = face;
    if ((typeof req.body.display_name !== 'undefined')) {
        postParms.display_name = req.body.display_name;
    } else {
        postParms.display_name = '人像库';
    }
    if ((typeof req.body.tags !== 'undefined')) {
        postParms.user_data = req.body.tags;
    }
    request({
        uri: "https://api-cn.faceplusplus.com/facepp/v3/faceset/create",
        method: "POST",
        form: postParms,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var options = {};
            options.libraryName = postParms.display_name;
            options.libraryMarks = postParms.tags;
            options.libraryToken = body.faceset_token;
            options.count = body.face_count;
            options.timestamp = Date.parse(new Date())/1000;
            options.connection = connection;
            operation.addLibrary(options).then((results) => {
                res.json({
                    rtn: 0,
                    message: 'OK',
                    total_count: results.length,
                    results
                });
            }).catch((err) => {
                res.json(body);
            });
        }else {
            res.json({
                rtn: -1,
                message: '添加人像库失败'
            });
        }
    });
};