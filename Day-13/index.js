const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const port = 5000;

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server, path: '/websocket' });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            ws.send(message);
        });
    });
}

const httpServer = http.createServer(app);

setupWebSocket(httpServer);

app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'websocket.html'));
});

httpServer.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
})