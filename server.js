const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let users = [];
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('user joined', (username) => {
        const user = {
            id: socket.id,
            username: username
        };
        users.push(user);
        io.emit('user count', users.length);
        console.log(`${username} joined the chat`);
    });
    socket.on('new message', (data) => {
        const user = users.find(u => u.id === socket.id);
        
        if (user) {
            const messageData = {
                username: user.username,
                message: data.message
            };
            
            io.emit('new message', messageData);
            console.log(`${user.username}: ${data.message}`);
        }
    });
    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
    });
    
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing');
    });
    socket.on('disconnect', () => {
        const userIndex = users.findIndex(u => u.id === socket.id);
        
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            io.emit('user count', users.length);
            console.log('User disconnected:', socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});