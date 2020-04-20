
//declaring express, pool and router as available for use.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

//employed the above built-ins
/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(express.static('build'));

//declaring a route for each router
/** ---------- ROUTES ---------- **/
const movieRouter = require('./routes/movie.router');
const detailsRouter = require('./routes/details.router');
const editRouter = require('./routes/edit.router');
const genreRouter = require('./routes/genre.router');

//employing each route declared
app.use('/api/movies', movieRouter);
app.use('/api/details', detailsRouter);
app.use('/api/edit', editRouter);
app.use('/api/genre', genreRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});