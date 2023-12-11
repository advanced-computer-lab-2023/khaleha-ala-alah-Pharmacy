let io;

exports.init =(httpServer) => {
    //io = require('socket.io')(httpServer);
    io = require('socket.io')(httpServer, {
        cors: {
            origin: 'http://localhost:3000', // Allow your React app's origin
            methods: ['GET', 'POST'], // Adjust as per your needs
        }
    });
    
    return io;
}

exports.getIO = () =>{
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}

