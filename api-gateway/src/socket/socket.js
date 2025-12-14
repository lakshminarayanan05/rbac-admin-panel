const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.use((socket, next) => {

        const token = socket.handshake.auth?.token;

        if(!token){
            return next(new Error('Authentication token missing'))
        }
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            socket.user = {
                id: decoded.userId,
                roles: decoded.roles || 'USER',
            };
            next();
        }   catch (err){
            next(new Error('Invalid or expired token'));
        }
    })

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        if(socket.user.roles.includes('ADMIN')){
            socket.join('admins');
            console.log(`Admin ${socket.user.id} joined admins room`);
        }
        socket.join('users');

        socket.on('disconnect', () => {
            console.log('Client disconnect', socket.id);
            
        });
    });
};

const getIO = () => io;
module.exports = { initSocket, getIO };
