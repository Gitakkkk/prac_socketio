require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socket = require('socket.io');
const io = socket(server);
const port = process.env.PORT;

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('User Join');
});

server.listen(port, () => {
    console.log('서버가 연결되었습니다.');
});
