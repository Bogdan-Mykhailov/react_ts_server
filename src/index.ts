'use strict';

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const index = express();
const server = http.createServer(index);
const io = new Server(
  server,
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  },
);

const PORT = 4000;

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions += 1;
  io.emit('sessionCountUpdate', activeSessions);

  socket.on('disconnect', () => {
    activeSessions -= 1;
    io.emit('sessionCountUpdate', activeSessions);
  });

  socket.on('getSessionCount', () => {
    io.to(socket.id).emit('sessionCountUpdate', activeSessions);
  });
});

index.use((req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
