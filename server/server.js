const express = require('express');
const http = require('http');
const path = require('path');
const sio = require('socket.io');

const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = sio(server);

app.use(express.static(publicpath));

io.on('connection',(socket) => {
	console.log('New user connected');

	socket.emit('newMessage',{
		from:'newuser@mail.com',
		text: 'Cool things',
		createAt: '123'
	});

	socket.on('createMessage',(message) => {
		console.log('createMessage', message);
	});

	socket.on('disconnect',() => {
		console.log('User disconnected');
	});

});



server.listen(3000,(res,req) => {
	console.log(`App is running on ${port}`);
});