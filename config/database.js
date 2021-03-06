var fs = require("fs");
var mysql = require("mysql");
var pool;

var query = function (sql, callback) {

    fs.readFile('./config/config.json', 'utf-8', function (err, data) {
        if (err) {
            console.log("error");
        } else {
            data = JSON.parse(data);
            pool = mysql.createPool(data);
            pool.getConnection(function (err, conn) {
                if (err) {
                    callback(err, null, null);
                } else {
                    conn.query(sql, function (err, results, fields) {
                        //释放连接
                        conn.release();
                        //事件驱动回调
                        callback(err, results, fields);
                    });
                }
            });
        }
    });
};

module.exports = query;
