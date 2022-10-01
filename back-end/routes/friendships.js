const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

module.exports = (db) => {

  // Queries
  const getFriendships = `
    SELECT * FROM friendships 
    JOIN users on users.id IN (sender, receiver)
    WHERE NOT users.id = $1
    AND sender = $1 
    OR receiver = $1
    AND status = true;
  `;

  const getPendingFriendships = `
    SELECT * FROM friendships 
    JOIN users on users.id IN (sender, receiver)
    WHERE NOT users.id = $1
    AND status = false
    AND sender = $1 
    OR receiver = $1;
  `;

  // Get current user's friends
  router.get('/', (req, res) => {
    const queryParams = [req.session.user_id || 1];
    const queryString = getFriendships;
    
    db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });

  // Get current user's pending friends requests
  router.get('/pending', (req, res) => {
    const queryParams = [req.session.user_id || 1];
    const queryString = getPendingFriendships;
    
    db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  // POST /friendships/new
  // Send a friend request



  // DELETE /friendships/:friend_id
  // Delete a friend

  return router;
}