var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'qdm158190638.my3w.com',
    user: 'qdm158190638',
    password: 'qdm158190638',
    port: '3306',
    database: 'qdm158190638_db',
    insecureAuth: true
});
var query = function (sql, callback) {
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
};

module.exports = query;
