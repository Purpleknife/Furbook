const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // /api/posts/postlikes/:post_id
  router.get('/postlikes/:post_id', (req, res) => {
    console.log("Querying postlikes for post_id", req.params.post_id)
    const queryParams = [req.params.post_id || 8];
    const queryString = `
    SELECT post_id, user_id 
    FROM postlikes
    WHERE post_id = $1;
    `;

    db.query(queryString, queryParams)
      .then(data => {
        console.log("postlikes data:", data);
        res.json(data.rows);
      })
      .catch(e => console.log(e));
  });


  return router;
}