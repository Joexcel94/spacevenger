// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var phpExpress = require('php-express')({
  binPath: 'php'
});

// set view engine to php-express
app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.use(express.static('public'));
app.use(express.static('joexc'));


app.use(express.static('views/'));

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});
console.log('Server running...');

io.on('connection', client => {
    console.log('Client connected...');
    client.on('join', data => {
       console.log(data);
	   client.emit('messages', 'Hello from server');
    });
});

server.listen(8080);
