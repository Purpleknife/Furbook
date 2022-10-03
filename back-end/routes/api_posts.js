const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // /api/posts/postlikes/:post_id
  router.get('/postlikes/:post_id', (req, res) => {

    const queryParams = [];
    const queryString = `
    
    `;

    db.query()
      .then()

  });


  // /api/posts/comments/:post_id


  return router;
}