const express = require('express');
const router  = express.Router();
//const db = require('../db/connection');

module.exports = (db) => { 

  // Searchbar
  router.get('/', (req, res) => {
    console.log("SEARCH BAR FUNCTION: I MADE IT HERE");
    const name = req.query.name;
    console.log("Name to search: ", name);

    queryParams = [name];
    queryString = `
      SELECT * FROM users
      WHERE LOWER(first_name) LIKE $1
      OR LOWER(last_name) LIKE $1;
    `;

    db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      });
  });

  return router;
};