const configs = require('../config');
const fs = require('fs');

function library(options) {
    const sql = `INSERT INTO library (libraryName, libraryMarks, libraryToken, count, timestamp) VALUES ('${options.libraryName}', '${options.libraryMarks}', '${options.libraryToken}', ${options.count}, ${options.timestamp})`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            fs.mkdir('./public/library-images/' + options.libraryToken, function (err) {
                if(err)
                    throw err;
                console.log('创建目录成功')
            });

            resolve(options);
        });
    });
}


function queryInfo(options) {
    const sql = `select * from library where libraryToken='${options.libraryToken}'`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.length === 0) {
                return reject(new Error('image id no exists'));
            }
            resolve(res);
        });
    });
}

function addLibrary(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        library(options).then(queryInfo).then(resolve).catch(reject);
    });
}

function queryLibrary(options) {
    const sql = `select * from library`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.length === 0) {
                return reject(new Error('image id no exists'));
            }
            resolve(res);
        });
    });
}

function getLibrary(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        queryLibrary(options).then(resolve).catch(reject);
    });
}

function optLibrary(options) {
    const sql = `delete from library where id=${options.id}`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(options);
        });
    });
}

function deleteLibrary(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        optLibrary(options).then(queryLibrary).then(resolve).catch(reject);
    });
}

function upLibrary(options) {
    const sql = `update library set libraryName='${options.libraryName}', libraryMarks='${options.libraryMarks}' where libraryToken='${options.libraryToken}'`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(options);
        });
    });
}

function updateLibrary(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        upLibrary(options).then(queryInfo).then(resolve).catch(reject);
    });
}

exports.addLibrary = addLibrary;
exports.getLibrary = getLibrary;
exports.deleteLibrary = deleteLibrary;
exports.updateLibrary = updateLibrary;