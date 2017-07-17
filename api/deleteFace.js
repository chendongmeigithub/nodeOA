var request = require("request");
var connection = require('../db').pool;
var optFace = require('./optFace');
var face = require('../config/face');

module.exports = function (req, res) {
    var options = {};
    options.faceToken = req.body.faceToken;
    options.connection = connection;
    optFace.deleteFace(options).then((results) => {
        if((results.length > 0) && (typeof results[0].libraryToken !== 'undefined') && (typeof results[0].faceToken !== 'undefined')) {
            var postParms = {};
            postParms.api_key = face.api_key;
            postParms.api_secret = face.api_secret;
            postParms.faceset_token = results[0].libraryToken;
            postParms.face_tokens = results[0].faceToken;

            request({
                uri: "https://api-cn.faceplusplus.com/facepp/v3/faceset/removeface",
                method: "POST",
                form: postParms,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.json({
                        rtn: 0,
                        message: '图像删除成功',
                        results: body
                    });
                } else {
                    res.json({
                        rtn: -1,
                        message: '图像删除失败',
                        results: body
                    });
                }
            });
        }else {
            res.json({
                rtn: -1,
                message: '图像删除失败'
            });
        }

    }).catch((err) => {
        res.json({
            rtn: -1,
            message: '图像删除失败',
            results: err
        });
    });
};