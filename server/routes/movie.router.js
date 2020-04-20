//declaring express, pool and router as available for use.
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//this router is grabbing all the movies from the DB to render to the DOM in the homepage view
//And ordering them alphabetically by title
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM movies ORDER BY title ASC`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
