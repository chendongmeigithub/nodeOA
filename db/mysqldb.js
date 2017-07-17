const mysql = require('mysql');
const configs = require('../config');

function getConnection() {
    const connection = mysql.createConnection({
        host: configs.mysql.host,
        user: configs.mysql.user,
        password: configs.mysql.password,
        database: configs.mysql.database,
        dateStrings: configs.mysql.dateStrings,
        multipleStatements: configs.mysql.multipleStatements
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                return reject(err);
            }

            resolve(connection);
        })
    });
}

const pool = mysql.createPool({
    connectionLimit: configs.mysql.connectionLimit,
    host: configs.mysql.host,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.database,
    dateStrings: configs.mysql.dateStrings,
    multipleStatements: configs.mysql.multipleStatements
});

exports.getConnection = getConnection;
exports.pool = pool;
