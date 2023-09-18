const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const cors = require('cors');
app.use(morgan('dev'));
app.use(require("body-parser").json());
app.use(cors());

io.on('connection', (socket) => {
  const deck = ['sA', 'dA', 'hA', 'cA'];

  socket.on('join', (join) => {
    const roomName = "room1"
    console.log(socket.rooms)
    socket.join(roomName);
    console.log(socket.rooms)
    io.to(roomName).emit('addedId', socket.id)
    const roomId = socket.id
    console.log(`Socket Connected to Room ID: ${roomId}`)
    console.log(`Socket Connected to Room Name: ${roomName}`)
    console.log(io.sockets.adapter.rooms.get('room1'))
  })

  socket.on('message', ({ name, message }) => {
    console.log(`MESSAGE FROM ${name}: ${message}`);
    io.emit('new message', { name, message });
  })

  socket.on('move', (move) => {
    if (move === 'hit') {
      newCard = deck.pop();
      io.emit('card', newCard);
    } else if (move === 'stick') {
      io.emit('player', 'move player pointer 1+');
    }
    console.log(`MOVE FROM CLIENT: ${move}`);
  })
});

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userID = id;
  } catch (err) {
    req.userID = null;
  }
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

server.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server is listening on ${process.env.PORT}`);
  } else {
    console.log('Not Working');
  }
});
