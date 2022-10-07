const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

module.exports = (db) => {

  // Get current user's friends
  router.get('/', (req, res) => {
    const queryParams = [req.session.user_id || 1];
    
    const queryString = `
      SELECT * FROM friendships 
      JOIN users on users.id IN (sender, receiver)
      WHERE NOT users.id = $1
      AND sender = $1 
      OR receiver = $1;
    `;
    
    db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  // Send a friend request
  router.post('/new', (req, res) => {
    const sender = Number([req.body.sender]);
    const receiver = Number([req.body.receiver]);
    
    const queryParams = [sender, receiver];
    
    const queryString = `
      INSERT INTO friendships (sender, receiver, status, date_added)
      VALUES ($1, $2, false, CURRENT_DATE);
    `;

    db.query(queryString, queryParams)
      .then(() => {
        res.json("Friend request successfully created");
      });

  });


  // Accept friendship
  router.put('/:friend_id', (req, res) => {
    const queryParams = [req.params.friend_id];
    
    const queryString = `
      UPDATE friendships
      SET status = true
      WHERE sender = $1
      OR receiver = $1;
    `;

    db.query(queryString, queryParams)
      .then(() => {
        console.log("Friendship successfully accepted");
      })
  });



  // Remove friendship
  router.delete('/:friend_id', (req, res) => {
    const queryParams = [req.params.friend_id];
    
    const queryString = `
      DELETE FROM friendships
      WHERE sender = $1
      OR receiver = $1;
    `;

    db.query(queryString, queryParams)
      .then(() => {
        console.log("Friendship successfully removed");
      })

  });

  return router;
}