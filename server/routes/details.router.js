const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/:id', (req, res) => {

    console.log('Heres whats in id:', req.body);
    const id = req.body;
    const queryText = `SELECT * FROM movies WHERE movies.id = $1;`;
    pool.query(queryText, [id.movieId])
        .then((result) => {
            console.log( 'this is what the router is sending to index.js', result.rows[0] );
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;