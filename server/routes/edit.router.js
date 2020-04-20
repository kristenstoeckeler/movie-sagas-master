const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



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