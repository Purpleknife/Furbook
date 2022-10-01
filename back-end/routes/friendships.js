const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// GET /friendships/:user_id
// Show the user’s friends list

//Get current user's friends list
router.get('/', (req, res) => {
  const queryParams = [req.session.user_id || 1];
  const queryString = `
  SELECT * FROM friendships 
  WHERE sender = $1 
  OR receiver = $1
  `;
  
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

module.exports = router;