const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');

module.exports = (db) => {

  // GET /posts
  // Show user general feed / Load all user’s posts + friends’ posts + comments under each post
  router.get('/', (req, res) => {
    const queryString = 'SELECT * FROM posts';
    
    db.query(queryString).then(data => {
      res.json(data.rows);
    });
  });

  // POST /posts
  // Add new post

  // PUT /posts/:post_id
  // Edit a post

  // POST /posts/:post_id/likes
  // Like a post

  // GET /posts/post_id/comments
  // Load all comments for 1 post

  // POST /posts/:post_id/comments
  // Comment a post

  // DELETE /posts/:post_id/likes/:like_id
  // Remove a like

  // DELETE /posts/:post_id/comments/:comment_id
  // Delete a comment

  return router;
}
// module.exports = router;