const express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));
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
const conversationsRoutes = require('./routes/conversations');

// Mount all resource routes
app.use('/messages', messagesRoutes);
app.use('/conversations', conversationsRoutes);
app.use('/friendships', friendshipsRoutes);
app.use('/posts', postsRoutes);
app.use('/', usersRoutes);

// Sample GET route
// app.get('/api/data', (req, res) => res.json({
//   message: "Seems to work!",
// }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
