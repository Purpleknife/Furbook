// load .env data into process.env
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const PORT = 8080;

//const {Server} = require('socket.io');
// const socketIo = require('socket.io');
// const http = require('http');

// Express Configuration
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Separated Routes for each Resource
const usersRoutes = require('./routes/users');
const friendshipsRoutes = require('./routes/friendships');
const messagesRoutes = require('./routes/messages');
const postsRoutes = require('./routes/posts');
const searchRoutes = require('./routes/search');
const conversationsRoutes = require('./routes/conversations');
const db = require('./db/connection');

// Mount all resource routes
app.use('/messages', messagesRoutes);
app.use('/search', searchRoutes(db));
app.use('/conversations', conversationsRoutes);
app.use('/friendships', friendshipsRoutes(db));
app.use('/posts', postsRoutes(db));
app.use('/', usersRoutes(db));

//Implement WebSockets with socket.io
// const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000'
//   }
// }) //in case server and client run on different urls

// socketIo(server, {
//   handlePreflightRequest: (req, res) => {
//       const headers = {
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//           "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//           "Access-Control-Allow-Credentials": true
//       };
//       res.writeHead(200, headers);
//       res.end();
//   }
// });

//const io = new Server(http);

//const clients = {};

// io.on('connection',(client)=>{
//   console.log('client connected: ', client.id);
//   client.emit('system', `Welcome ${client.id}`);
//   client.broadcast.emit('system', `${client.id} has just joined.`);
  
//   client.join('clock-room');

//   client.on('test', (arg) => {
//     console.log('test passed!!', arg);
//     client.emit('passed', arg);
//   })
  
//   client.on('disconnect', ()=> {
//     console.log('Disconnecting client: ', client.id)
//     client.broadcast.emit('system', `${client.id} has just left.`);
//   })
// });


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});