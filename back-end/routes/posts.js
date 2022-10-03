const { query } = require('express');
const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');

module.exports = (db) => {

  // GET /posts
  // Show user general feed / Load all user’s posts + friends’ posts + comments under each post
  router.get('/', (req, res) => {

    const user = req.session.user_id || 1;

    const queryString = `
    SELECT DISTINCT posts.*, 
                    sender, 
                    receiver, 
                    users.image_url as users_image, 
                    users.first_name as users_first, 
                    users.last_name as users_last
    FROM friendships
    JOIN users ON users.id IN (sender, receiver)
    JOIN posts ON posts.creator = users.id
    JOIN postlikes ON posts.id = post_id
    WHERE NOT users.id = $1
    AND sender = $1
    OR receiver = $1
    AND status = true
    ORDER BY posts.id DESC
    `;

    const queryParams = [user];
    
    db.query(queryString, queryParams).then(data => {
      // console.log("In db query posts:", data.rows);
      res.json(data.rows);
    });
  });

  // POST /posts
  // Add new post
  router.post('/', (req, res) => {

    image_url = req.body.value || '';
    console.log("From POST /posts", req)

    queryParams = [];
    queryString = `
    INSERT INTO posts (creator, content, image_url)
    VALUES ($1, $2, $3)
    `;
  });

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