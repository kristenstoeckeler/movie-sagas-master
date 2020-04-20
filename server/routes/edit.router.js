//declaring express, pool and router as available for use.
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//this router is updating information to one specific movie based on the ID thats been passed in within req.body
//it's returning that info to index.js because I'm attempting to pass it back to the detailsSaga to re-render the Details view
//with the edited information from the DB
router.put('/', (req, res) => {

    console.log('Heres whats in req.body', req.body);
    const queryText = `UPDATE movies SET description = $1, title = $2 WHERE id=$3`;
    pool.query(queryText, [req.body.description, req.body.title, req.body.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;