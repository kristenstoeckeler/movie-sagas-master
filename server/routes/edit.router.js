const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.put('/', (req, res) => {

    console.log('Heres whats in req.body', req.body);
    const id = req.body;
    const queryText = `SELECT id, title, poster, description FROM movies WHERE id = $1`;
    pool.query(queryText, [id.movieId])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;