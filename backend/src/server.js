import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

import { PORT } from './utils/config.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('message', (message) => {
		socket.broadcast.emit('message', {
			body: message,
			from: socket.id,
		});
	});
});

app.use(cors());
app.use(morgan('dev'));

server.listen(PORT);
console.log('servidor up');
