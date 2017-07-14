var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });

var saveFile = function (options, base64) {
    var path = './public/library-images/' + options.libraryToken + '/';
    var dataBuffer = new Buffer(base64, 'base64');
    // 存储原始图片
    fs.writeFile(path + options.pictureUrl + '.jpg', dataBuffer, function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("保存成功！");
            for(var i = 0; i < options.faces.length; i++) {
                gm(path + options.pictureUrl + '.jpg')
                    .crop(options.faces[i].face_rectangle.width, options.faces[i].face_rectangle.height, options.faces[i].face_rectangle.left, options.faces[i].face_rectangle.right)
                    .write(options.faces[i].face_token + '.jpg', function(err) {
                        console.log(err);
                    });
            }
        }
    });
};

module.exports = saveFile;