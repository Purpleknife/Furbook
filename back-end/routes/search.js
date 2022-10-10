const express = require('express');
const router  = express.Router();
//const db = require('../db/connection');

module.exports = (db) => { 

  // Searchbar
  router.get('/', (req, res) => {
    const name = req.query.name;

    queryString = "Select * from users where lower(first_name) like '" + name +"%'"
    
    db.query(queryString)
      .then(data => {
        res.json(data.rows);
      });
  });

  return router;
};