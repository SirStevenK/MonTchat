var fs = require("fs");
var express = require("express");
var app = express();

var options = {
    key: fs.readFileSync( 'ssl/private_key.key'),
    cert: fs.readFileSync( 'ssl/ssl_certificate.cer'),
    requestCert: false,
    rejectUnauthorized: false
};

var path = require("path");
var https = require("https").createServer(options, app);
var io = require("socket.io").listen(https);

var messageToKing = [];
var messageToPD = [];
var messageToFL = [];

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://www.indiebaie.fr"+ req.url });
    res.end();
}).listen(80);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.render("page.ejs");
});

io.sockets.on('connection', function (socket) {

	console.log("oui");

    socket.emit("contentKing", messageToKing);
    socket.emit("contentPD", messageToPD);
    socket.emit("contentFL", messageToFL);

    socket.on("messageToKing", function (message) {
        messageToKing.push(message);
        socket.emit("contentKing", messageToKing);
	socket.broadcast.emit("contentKing", messageToKing);
    });
    socket.on("messageToPD", function (message) {
        messageToPD.push(message);
        socket.emit("contentPD", messageToPD);
	socket.broadcast.emit("contentPD", messageToPD);
    });
    socket.on("messageToFL", function (message) {
        messageToFL.push(message);
        socket.emit("contentFL", messageToFL);
	socket.broadcast.emit("contentFL", messageToFL);
    });
});

https.listen(443, "82.165.70.188");
