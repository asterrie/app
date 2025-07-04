const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Nowe połączenie:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} dołączył do pokoju ${room}`);
  });

  socket.on('message', ({ room, message }) => {
    io.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Rozłączono:', socket.id);
  });
});

server.listen(4000, () => console.log('Server działa na http://localhost:4000'));