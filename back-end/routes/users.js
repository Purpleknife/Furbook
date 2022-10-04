const express = require('express');
const router  = express.Router();
//const db = require('../db/connection');

module.exports = (db) => { 
  //Login route:
  router.get('/login/:id', (req, res) => {
    const queryString = `SELECT * FROM users WHERE users.id = $1;`;
    const queryParams = [req.session.user_id || 1];

    db.query(queryString, queryParams)
      .then(data => {
        req.session.user_id = data.rows[0].id;
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  //Profile route:
  router.get('/users/:id', (req, res) => {
    const queryString = `
      SELECT users.*, posts.* FROM posts
      JOIN users ON users.id = creator
      WHERE creator = $1
      ORDER BY posts.id DESC
      ;`
    const queryParams = [req.session.user_id || 1];

    db.query(queryString, queryParams)
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  //Edit profile:
  router.put('/users/:id', (req, res) => {
    const id = 1;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const relationship_status = req.body.relationship_status;
    const birthday = req.body.birthday;
    const location = req.body.location;

    const queryParams = [id, first_name, last_name, relationship_status, birthday, location];
    const queryString = `
      UPDATE users
      SET first_name = $2,
      last_name = $3,
      relationship_status = $4,
      birthday = $5,
      location = $6
      WHERE id = $1
      RETURNING *;
      `;
    console.log('Edit route is here!')
    db.query(queryString, queryParams)
    .then(data => {
      console.log('2 Edit route is here!')
      res.json(data.rows);
    })
    .catch(error => {
      console.log(error.message);
    });
  });


  //Logout route:
  router.get('/logout', (req, res) => {
    req.session = null;
    console.log('User logged out.')
    //return res.redirect('/');
  });

  return router;
};


// GET /users/:user_id
// Show profile & show the user’s posts

// PUT /users/:user_id
// Edit profile info



