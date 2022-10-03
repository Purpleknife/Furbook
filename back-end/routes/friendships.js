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
    OR receiver = $1;
  `;

  const removeFriendship = `
    DELETE FROM friendships
    WHERE sender = $1
    OR receiver = $1;
  `;

  // Get current user's friends
  router.get('/', (req, res) => {
    const queryParams = [req.session.user_id || 1];
    console.log("REQ.SESSION.USER_ID :", req.session.user_id);
    const queryString = getFriendships;
    
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
  router.delete('/:friend_id', (req, res) => {
    const queryParams = [req.params.friend_id];
    console.log("REQ.PARAMS.FRIEND_ID: ", req.params.friend_id);
    const queryString = removeFriendship;

    db.query(queryString, queryParams)
      .then(() => {
        console.log("Friendship successfully removed");
      })

  });

  return router;
}