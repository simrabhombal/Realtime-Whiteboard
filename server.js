

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
// const { io } = require("socket.io-client");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle drawing events
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data); // Broadcast drawing data to other clients
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 