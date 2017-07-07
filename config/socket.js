var query = function (io) {
    io.on('connection', function(socket) {
        socket.emit('news', {"name": 123123});
        socket.on('my other event', function (data) {
            console.log('my other event',data,'my other event');
        });
    });
};

module.exports = query;
