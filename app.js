const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://<UserNAme>:<Password>@ds129233.mlab.com:29233/todo', { useNewUrlParser: true });
const MoviesRoutes = require('../api/routes/movies');

const OrderRoutes = require('../api/routes/orders');



mongoose.Promise = global.Promise;
//static Folders
app.use('/css', express.static('css'));
app.use('/uploads', express.static('uploads'));




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'

    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH,DELETE ,GET');
        res.status(200).json({});
    }
    next();
});
//Handling Requests
app.use('/movies', MoviesRoutes);

app.get('/main', (req, res, next) => {
    res.render('main');
});
app.get('/todo', (req, res, next) => {
    res.render('todo');
});
app.get('/new', (req, res, next) => {
    res.render('newmov');
});
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