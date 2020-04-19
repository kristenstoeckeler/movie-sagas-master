const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/

const movieRouter = require('./routes/movie.router');
const detailsRouter = require('./routes/details.router');
const editRouter = require('./routes/edit.router');
app.use('/api/movies', movieRouter);
app.use('/api/details', detailsRouter);
app.use('/api/edit', editRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});