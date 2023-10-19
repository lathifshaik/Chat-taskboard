const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://ilathifshaik:CuwvKanZDRcEY6wj@cluster0.8dw6d7l.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/tasks', taskRoutes);

// Starting the server and setting up Socket.io
const server = app.listen(5000, () => console.log('Server started on port 5000'));

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send-message', (roomId, message) => {
        // This is a simplified broadcast. Ideally, you'd want to save this message to the database.
        io.to(roomId).emit('new-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
