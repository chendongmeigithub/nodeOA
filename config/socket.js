var socketReg = function (io) {
    io.on('connection', function(socket) {
        socket.emit('entrance', {
            "data": [],
            "status": 1
        });
    });
};

module.exports = socketReg;
