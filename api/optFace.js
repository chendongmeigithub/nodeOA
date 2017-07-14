const configs = require('../config');

function library(options) {
    const sql = `INSERT INTO library (libraryName, libraryMarks, libraryToken, count, timestamp) VALUES ('${options.libraryName}', '${options.libraryMarks}', '${options.libraryToken}', ${options.count}, ${options.timestamp})`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }

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
    var sql = `delete from library where id=${options.id}`;
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

function getFaceLibrary(options) {
    var sql = `select id from library where libraryToken='${options.libraryToken}'`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            } else if (res.length > 0) {
                options.id = res[0].id;
                resolve(options);
            } else {
                resolve({
                    rtn: -1,
                    message: '未查询到人像库'
                });
            }
        });
    });
}

function addPicture(options) {
    var sql = "INSERT INTO picture(pictureUrl, snapshotUrl, timestamp, libraryId, attributes) VALUES ";

    var str = '';

    for (var i = 0; i < options.faces.length; i++) {
        if (str === '') {
            str += "('" + options.pictureUrl + ".jpg', '" + options.faces[i].face_token + ".jpg', '" + options.timestamp + "', '" + parseInt(options.id) + "', '" + JSON.stringify(options.faces[i].attributes) + "')";
        } else {
            str += ",('" + options.pictureUrl + ".jpg', '" + options.faces[i].face_token + ".jpg', '" + options.timestamp + "', '" + parseInt(options.id) + ", '" + JSON.stringify(options.faces[i].attributes) + "')";
        }
    }

    sql += str;


    // return new Promise((resolve, reject) => {
    //     options.connection.query(sql, (err, res) => {
    //         if (err) {
    //             return reject(err);
    //         }else if(res.length > 0) {
    //             options.id = res[0].id;
    //             resolve(options);
    //         }else{
    //             resolve({
    //                 rtn: -1,
    //                 message: '未查询到人像库'
    //             });
    //         }
    //     });
    // });
}

function addFace(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        getFaceLibrary(options).then(addPicture).then(resolve).catch(reject);
    });
}

exports.addFace = addFace;