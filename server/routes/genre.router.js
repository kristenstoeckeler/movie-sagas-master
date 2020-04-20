//declaring express, pool and router as available for use.
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//this router is grabbing all the genres associated with one specific movie based on the ID thats been passed in within req.body
//and returning it to index.js
router.post('/:id', (req, res) => {

    console.log('Heres whats in req.body:', req.body);
    const id = req.body;
    const queryText = `SELECT movie_genre, movie_id, "genres"."name" FROM movie_genre 
                        JOIN genres ON movie_genre.movie_genre = genres.id
                        WHERE movie_id = $1;`;
    pool.query(queryText, [id.movieId])
        .then((result) => {
            console.log('this is what the router is sending to index.js', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;