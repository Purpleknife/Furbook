//const { query } = require('express');
const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');

module.exports = (db) => {

  // Fetch the posts's likes:
  router.get('/postlikes/:post_id', (req, res) => {
    //console.log("Querying postlikes for post_id", req.params.post_id)
    const queryParams = [req.params.post_id];
    const queryString =    
    `SELECT posts.id, COUNT(DISTINCT postlikes.id)
    FROM posts
    JOIN postlikes ON posts.id = postlikes.post_id
    WHERE postlikes.post_id = $1
    GROUP BY posts.id;` ;

    // `SELECT postlikes.*, COUNT(postlikes) as like_count
    // FROM postlikes
    // WHERE post_id = 8
    // GROUP BY post_id, postlikes.id;`

    db.query(queryString, queryParams)
      .then(data => {
        //console.log("postlikes data:", data);
        res.json(data.rows);
      })
      .catch(e => console.log(e));
  });


  // Fetch the posts's comments:
  router.get('/comments/:post_id', (req, res) => {
    const queryParams = [req.params.post_id];
    const queryString =
    `SELECT posts.id, comments.content, comments.date_added, users.id AS user_id, users.first_name, users.last_name, users.image_url
    FROM users
    JOIN comments ON users.id = comments.user_id
    JOIN posts ON posts.id = comments.post_id
    WHERE comments.post_id = $1;`

    // `SELECT posts.id, comments.content
    // FROM posts
    // JOIN comments ON posts.id = comments.post_id
    // WHERE comments.post_id = $1;` ;

    db.query(queryString, queryParams)
      .then(data => {
        //console.log('comments sent:', data.rows);
        res.json(data.rows);
      })
      .catch(e => console.log(e));
  });


  //Add likes on posts:
  router.post('/postlikes/:post_id', (req, res) => {
    const post_id = req.body.post_id;
    const user_id = req.session.user_id;

    const queryParams = [post_id, user_id];
    const queryString = `
    INSERT INTO postlikes (post_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then(data => {
        console.log('Likes added:', data.rows);
        res.json(data.rows);
      })
      .catch(e => console.log(e));
  });

  //Add comments on posts:
  router.post('/comments/:post_id', (req, res) => {
    const post_id = req.body.post_id;
    const user_id = req.session.user_id;
    const content = req.body.content;

    const queryParams = [post_id, user_id, content];
    const queryString = `
    INSERT INTO comments (post_id, user_id, content, date_added)
    VALUES ($1, $2, $3, Now())
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then(data => {
        console.log('Comments added:', data.rows);
        res.json(data.rows);
      })
      .catch(e => console.log(e));
  });



  // GET /posts
  // Show user general feed / Load all user’s posts + friends’ posts + comments under each post
  router.get('/', (req, res) => {

    const user = req.session.user_id;

    const queryString = `
    SELECT posts.*,
          users.image_url as users_image, 
          users.first_name as users_first, 
          users.last_name as users_last
    FROM posts
    JOIN users ON users.id = posts.creator                
    WHERE creator IN (SELECT DISTINCT users.id
                      FROM friendships
                      JOIN users ON users.id IN (sender, receiver)
                      WHERE receiver = $1
                      OR sender = $1
                      AND status = true)
    ORDER BY posts.id DESC
    `;

    const queryParams = [user];
    
    db.query(queryString, queryParams).then(data => {
      res.json(data.rows);
    });
  });

  // POST /posts
  // Add new post
  router.post('/', (req, res) => {
    
    image_url = req.body.image_url || '';

    queryParams = [req.session.user_id, req.body.content, image_url];
    queryString = `
    INSERT INTO posts (creator, content, image_url)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

    db.query(queryString, queryParams).then(data => {
      res.json(data.rows);
    });
  });

  // PUT /posts/:post_id
  // Edit a post
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const content = req.body.content;

    const queryParams = [id, content];
    const queryString = `
      UPDATE posts
      SET content = $2
      WHERE id = $1
      RETURNING *;
      `;
    console.log('Edit route for posts is here!')
    db.query(queryString, queryParams)
    .then(data => {
      console.log('2 Edit route for posts is here!')
      console.log('data.rows', data.rows);
      res.json(data.rows);
    })
    .catch(error => {
      console.log(error.message);
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const queryParams = [id];
    const queryString = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
      `;
    console.log('Delete route for posts is here!')
    db.query(queryString, queryParams)
    .then(data => {
      console.log('2 Delete route for posts is here!')
      console.log('data.rows', data.rows);
      res.json(data.rows);
    })
    .catch(error => {
      console.log(error.message);
    });
  })

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