require("dotenv").config();
const express = require("express");
const configViewEngine = require("./src/config/viewEngine");
const app = express();
const port = process.env.PORT || 3000;
const webRoute = require("./src/route/web");
const connection = require("./src/config/database");
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
//config request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

configViewEngine(app);

app.use("/", webRoute);
io.on('connection', (socket) => {
    console.log('Một người dùng đã kết nối');

    // Khi user gửi tin nhắn lên socket
    socket.on('send_message', (data) => {
        // Gửi tin nhắn này đến tất cả mọi người (hoặc theo phòng - room)
        io.emit('receive_message', data);
    });
});


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
