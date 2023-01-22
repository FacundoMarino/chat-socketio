import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { PORT } from './utils/config.js';
import { url } from 'inspector';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
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

app.use(express.static(join(__dirname, '../../client/build')));

server.listen(PORT);
console.log('servidor up');
