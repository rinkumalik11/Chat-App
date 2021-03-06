const express = require('express');
const http = require('http');
const path = require('path');
const sio = require('socket.io');

var {generateMessage} = require('./utils/message');

const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = sio(server);

app.use(express.static(publicpath));

io.on('connection',(socket) => {
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin','Welcome To The Chat App'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));


	socket.on('createMessage',(message) => {
		console.log('createMessage', message);
		io.emit('newMessage',generateMessage(message.from,message.text));

		// socket.broadcast.emit('newMessage',{
		// 		from: message.from,
		// 		text:message.text,
		// 		createdAt: new Date().getTime()
		// 	});
	});

	socket.on('disconnect',() => {
		console.log('User disconnected');
	});

});



server.listen(3000,(res,req) => {
	console.log(`App is running on ${port}`);
});