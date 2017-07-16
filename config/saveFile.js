var fs = require('fs');
var images = require("images");

var saveFile = function (options, base64) {
    var path = './public/library-images/' + options.libraryToken + '/';
    var dataBuffer = new Buffer(base64, 'base64');
    // 存储原始图片
    fs.writeFile(path + options.pictureUrl + '.jpg', dataBuffer, function(err) {
        if(err){
            console.log(err);
        }else{
            for(var i = 0; i < options.faces.length; i++) {
                console.log(options.faces[i].face_rectangle);
                images(images(dataBuffer), options.faces[i].face_rectangle.left, options.faces[i].face_rectangle.top, options.faces[i].face_rectangle.width, options.faces[i].face_rectangle.height)
                    .save(path + options.faces[i].face_token + '.jpg', {
                        quality : 80
                    });
                images.gc();
            }



        }
    });
};

module.exports = saveFile;