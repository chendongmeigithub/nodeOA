var optFile = require('./optFile');
var configs = require('../config');

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
                    message: '未查询到人像库',
                    results: err
                });
            }
        });
    });
}

function addPicture(options) {
    var sql = "INSERT INTO picture(pictureUrl, snapshotUrl, timestamp, libraryId, attributes, faceToken) VALUES ";

    var str = '';

    for (var i = 0; i < options.faces.length; i++) {
        if (str === '') {
            str += "('" + options.pictureUrl + ".jpg', '" + options.faces[i].face_token + ".jpg', " + options.timestamp + ", " + parseInt(options.id) + ", '" + JSON.stringify(options.faces[i].attributes) + "', '" + options.faces[i].face_token + "')";
        } else {
            str += ", ('" + options.pictureUrl + ".jpg', '" + options.faces[i].face_token + ".jpg', " + options.timestamp + ", " + parseInt(options.id) + ", '" + JSON.stringify(options.faces[i].attributes) + "', '" + options.faces[i].face_token + "')";
        }
    }

    sql += str;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                // 存储文件
                optFile.saveFile(options);
                resolve(options);
            }
        });
    });
}

function queryInfo(options) {
    const sql = `select * from picture where libraryId='${options.id}'`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            console.log(res);
            resolve(res);
        });
    });
}

/**
 * @description 人像库添加图片
 * @param options
 * @returns {Promise}
 */
function addFace(options) {
    return new Promise((resolve, reject) => {
        // if (options.libraryName === undefined || options.libraryMarks === undefined || options.libraryToken === undefined || options.count === undefined || options.timestamp === undefined) {
        //     return reject(new Error('unexcepted request data'));
        // }

        getFaceLibrary(options).then(addPicture).then(queryInfo).then(resolve).catch(reject);
    });
}


function deletePicture(options) {
    const sql = 'select * from picture where faceToken="' + options.faceToken + '";delete from picture where faceToken="' + options.faceToken + '";';
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                options.libraryId = res[0][0].libraryId;
                options.snapshotUrl = res[0][0].snapshotUrl;
                options.faceToken = res[0][0].faceToken;
                resolve(options);
            }
        });
    });
}

function getLibraryToken(options) {
    const sql = `select * from library where id='${options.libraryId}'`;
    return new Promise((resolve, reject) => {
        options.connection.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            } else if (res.length > 0) {
                optFile.deleteFile(res[0].libraryToken, options.snapshotUrl);
                res[0].faceToken = options.faceToken;
                resolve(res);
            }
        });
    });
}

/**
 * @description 人像库删除图片
 * @param options
 * @returns {Promise}
 */
function deleteFace(options) {
    return new Promise((resolve, reject) => {
        deletePicture(options).then(getLibraryToken).then(resolve).catch(reject);
    });
}

exports.addFace = addFace;
exports.deleteFace = deleteFace;