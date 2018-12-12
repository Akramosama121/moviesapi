const express = require('express');
const app = express();
const morgan = require('morgan');
const MoviesRoutes = require('../api/routes/movies');
const OrderRoutes = require('../api/routes/orders');
app.use(morgan('dev'));
//Handling Requests
app.use('/movies', MoviesRoutes);
app.use('/orders', OrderRoutes);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { Message: error.message }
    });
});
module.exports = app;