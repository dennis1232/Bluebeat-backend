module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('sendMsg', (msg) => {
            io.to(socket.roomId).emit('sentMsg', msg)
        })
        socket.on('sendEmoji', (emoji) => {
            socket.broadcast.to(socket.roomId).emit('reciveEmoji', emoji)
        })
        socket.on('beatChanged', (beat) => {
            socket.broadcast.to(socket.roomId).emit('beatChanged', beat)
        })
        socket.on('songChanged', (song) => {
            io.to(socket.roomId).emit('songChanged', song)
        })
        socket.on('joinRoom', roomId => {
            if (socket.roomId) {
                socket.leave(socket.roomId)
            }
            socket.join(roomId)
            socket.roomId = roomId;
        })
        socket.on('userTyping', loggedinUser => {
            socket.broadcast.to(socket.roomId).emit('userTyping', loggedinUser)
        })
    })
}

