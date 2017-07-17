var request = require("request");
var connection = require('../db').pool;
var optFace = require('./optFace');
var face = require('../config/face');

module.exports = function (req, res) {
    var postParms = {};
    postParms.api_key = face.api_key;
    postParms.api_secret = face.api_secret;
    if ((typeof req.body.faceset_token !== 'undefined') && (typeof req.body.image_base64 !== 'undefined')) {
        postParms.faceset_token = req.body.faceset_token;
        postParms.image_base64 = req.body.image_base64;
        postParms.return_attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity';

        request({
            uri: "https://api-cn.faceplusplus.com/facepp/v3/detect",
            method: "POST",
            form: postParms,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200 && body.faces.length > 0) {
                var faces = body.faces;
                var addfaceParms = {};
                addfaceParms.api_key = face.api_key;
                addfaceParms.api_secret = face.api_secret;
                addfaceParms.faceset_token = postParms.faceset_token;
                addfaceParms.face_tokens = '';
                for (var i = 0; i < body.faces.length; i++) {
                    if (addfaceParms.face_tokens === '') {
                        addfaceParms.face_tokens =  body.faces[i].face_token
                    } else {
                        addfaceParms.face_tokens +=  ',' + body.faces[i].face_token
                    }
                }
                request({
                    uri: "https://api-cn.faceplusplus.com/facepp/v3/faceset/addface",
                    method: "POST",
                    form: addfaceParms,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var options = {};
                        options.faces = faces;
                        options.pictureUrl = body.request_id.replace(/,/, "_");
                        options.libraryToken = postParms.faceset_token;
                        options.count = body.face_count;
                        options.timestamp = Date.parse(new Date())/1000;
                        options.image_base64 = postParms.image_base64;
                        options.connection = connection;

                        optFace.addFace(options).then((results) => {
                            res.json({
                                rtn: 0,
                                message: 'OK',
                                total_count: results.length,
                                results
                            });
                        }).catch((err) => {
                            res.json({
                                rtn: -1,
                                message: '图片导入失败',
                                results: err
                            });
                        });
                    } else {
                        res.json({
                            rtn: -1,
                            message: '图片导入失败',
                            results: body
                        });
                    }
                });
            } else {
                res.json({
                    rtn: -1,
                    message: '人脸识别失败',
                    results: body
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