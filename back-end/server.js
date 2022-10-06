// load .env data into process.env
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const PORT = 8080;

const socketIo = require('socket.io');

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
io.on('connection',(socket)=>{
  console.log('client connected: ', socket.id)
  
  socket.join('clock-room')
  
  socket.on('disconnect', (reason)=>{
    console.log(reason)
  })
})
setInterval(()=>{
     io.to('clock-room').emit('time', new Date())
},1000)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
