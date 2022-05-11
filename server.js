require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socket = require('socket.io');
const io = socket(server);
const port = process.env.PORT;
let socketList = [];

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    socketList.push(socket);
    console.log('User Join');

    socket.on('SEND', (msg) => {
        console.log(msg);
        socketList.forEach((item, i) => {
            console.log(item.id);
            if (item != socket) {
                item.emit('SEND', msg);
            }
        });
    });

    socket.on('disconnect', () => {
        socketList.splice(socketList.indexOf(socket), 1);
    });
});

server.listen(port, () => {
    console.log('서버가 연결되었습니다.');
});
