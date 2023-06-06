import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const port = 8080;
const ioPort = 3001;

app.use(cors());
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', (socket) => {
  //經過連線後在 console 中印出訊息
  console.log('success connect!');
  //監聽透過 connection 傳進來的事件
  socket.on('message', (message) => {
    //回傳 message 給發送訊息的 Client
    socket.emit('message', message);
  });
});

httpServer.listen(ioPort, () => {
  console.log(`Socket.io listening on port ${ioPort}`);
});

app.listen(port, () => {
  console.log(`STYLiSH listening on port ${port}`);
});
