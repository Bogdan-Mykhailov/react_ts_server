'use strict';

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
