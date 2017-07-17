var fs = require('fs');
var images = require("images");

var saveFile = function (options) {
    var path = './public/library-images/' + options.libraryToken + '/';
    var dataBuffer = new Buffer(options.image_base64, 'base64');
    // 存储原始图片
    fs.writeFile(path + options.pictureUrl + '.jpg', dataBuffer, function(err) {
        if(err){
            return {status: 0};
        }else{
            for(var i = 0; i < options.faces.length; i++) {
                images(images(dataBuffer), options.faces[i].face_rectangle.left, options.faces[i].face_rectangle.top, options.faces[i].face_rectangle.width, options.faces[i].face_rectangle.height)
                    .save(path + options.faces[i].face_token + '.jpg', {
                        quality : 100
                    });
                images.gc();

            }
            return {status: 1};
        }
    });
};

var deleteFile = function (libraryToken, snapshotUrl) {
    var path = './public/library-images/' + libraryToken + '/';
    fs.unlink(path + snapshotUrl, function (err) {
        if(err){
            console.log(err);
        }
   })
};

exports.saveFile = saveFile;
exports.deleteFile = deleteFile;