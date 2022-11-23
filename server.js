port = process.env.PORT || 8080;

const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const http = require("http");
const server = http.createServer(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

server.listen(port);
console.log(`Server started on port ${port}`);




wss.on('connection', function connection(ws) {

    ws.on('message', function message(data) {

        var receivedData = String(data);
        console.log(receivedData);
        broadcast(ws, receivedData);
    });

    ws.send('something');
});

const broadcast = (ws, message) => {
    wss.clients.forEach((client) => {
        client.send(message);
    })
};


