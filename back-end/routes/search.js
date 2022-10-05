const express = require('express');
const router  = express.Router();
//const db = require('../db/connection');

module.exports = (db) => { 

  // Searchbar
  router.get('/', (req, res) => {
    console.log("SEARCH BAR FUNCTION: I MADE IT HERE");
    const name = req.query.name;
    console.log("Name to search: ", name);

    queryString = "Select * from users where lower(first_name) like '" + name +"%'"
    console.log("QUERY STRING VERIFICATION ", queryString);

    db.query(queryString)
      .then(data => {
        res.json(data.rows);
      });
  });

  return router;
};