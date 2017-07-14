var request = require("request");
var connection = require('../db').pool;
var operation = require('./optLibrary');

module.exports = function(req,res) {
    if ((typeof req.body.id !== 'undefined')) {
        var options = {};
        options.id = parseInt(req.body.id);
        options.connection = connection;
        operation.deleteLibrary(options).then((results) => {
            res.json({
                rtn: 0,
                message: 'OK',
                total_count: results.length,
                results
            });
        }).catch((err) => {
            res.json(body);
        });
    } else {
        res.json({
            rtn: -1,
            message: '缺少参数(库id)'
        });
    }
};