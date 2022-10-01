const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

module.exports = (db) => {

  //Get current user's friends
  router.get('/', (req, res) => {
    console.log("I MADE IT HERE")
    const queryParams = [req.session.user_id || 1];
    const queryString = `
    SELECT * FROM friendships 
    WHERE sender = $1 
    OR receiver = $1`;
    
    db.query(queryString, queryParams)
      .then(data => {
        console.log('FRIENDS QUERY RESULTS:', data);
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