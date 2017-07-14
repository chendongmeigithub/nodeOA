var connection = require('../db').pool;
var operation = require('./optLibrary');

module.exports = function(req,res) {
    var options = {};
    options.connection = connection;
    operation.getLibrary(options).then((results) => {
        res.json({
            rtn: 0,
            message: 'OK',
            total_count: results.length,
            results
        });
    }).catch((err) => {
        res.json(body);
    });
};