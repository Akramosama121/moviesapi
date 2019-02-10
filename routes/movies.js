const express = require('express');
var $ = require('jquery');
var fileupload = require("express-fileupload");

const router = express.Router();
var fs = require('fs');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({
    extended: true
});

const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }

});
const filefilter = (req, file, cb) => {
    //accept file
    if (file.mimetye === 'image/jep' || file.mimetye === 'image/png') {
        cb(null, true);
    }
    //reject file 
    else {
        cb(null, false);
    }


};
const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});


const Movie = require('../models/movies');

router.get('/add', urlencodedParser, (req, res, next) => {
    res.render('todo');
});
router.get('/', (req, res, next) => {
    Movie.find()
        .select(' _id Request CoverImage name genre publisYear Director Actors ProductionCompanies Producers Budget imdbrating rottertomattosrating description price')
        .exec()

    .then(docs => {
            const all = docs[1].Url;
            const name = docs.name;
            const response = {
                Count: docs.length,

                Movies: docs.map(doc => {
                    return {
                        name: doc.name,
                        genre: doc.genre,
                        publisYear: doc.publisYear,
                        Director: doc.Director,
                        Actors: doc.Actors,
                        ProductionCompanies: doc.ProductionCompanies,
                        Producers: doc.Producers,
                        Budget: doc.Budget,
                        imdbrating: doc.imdbrating,
                        rottertomattosrating: doc.rottertomattosrating,
                        description: doc.description,
                        CoverImage: doc.CoverImage,
                        price: doc.price,
                        MovieId: doc._id,
                        Type: 'GET',
                        // Url: 'http://localhost:3000/movies/' + MovieId

                    }

                })
            };
            console.log(docs[0].MovieId);
            res.status(200).render('allmov', {
                Count: response.Count,
                Movies: docs
            });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({

                Error: err
            });
        });
});
router.post('/', upload.single('image'), urlencodedParser, (req, res, next) => {
    console.log(req.file);
    console.log(req.body.name);
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        genre: req.body.genre,
        publisYear: req.body.publisYear,
        Director: req.body.Director,
        Actors: req.body.Actors,
        ProductionCompanies: req.body.ProductionCompanies,
        Producers: req.body.Producers,
        Budget: req.body.Budget,
        imdbrating: req.body.imdbrating,
        rottertomattosrating: req.body.rottertomattosrating,
        description: req.body.description,
        price: req.body.price,
        CoverImage: req.file.path,

    });
    movie.save()
        .then(result => {

            console.log(result);
            const Url = 'http://localhost:3000/movies/' + result._id;
            const urr = Url;
            console.log(urr);
            res.status(201).render('succeded', {
                Movie: result,
                Url: urr
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({

                Error: err
            });
        });

});

router.get('/:MovieId', (req, res, next) => {
    const id = req.params.MovieId;
    Movie.findById(id)
        .select('name genre publisYear Director Actors ProductionCompanies Producers Budget imdbrating rottertomattosrating description price CoverImage')
        .exec()
        .then(doc => {
            var url = {
                url: 'http://localhost:3000/movies/' + doc._id
            };
            var src = {
                src: '/' + doc.CoverImage
            };
            console.log("Here's Your Movie Fetced From Database", doc);
            console.log("Here's Your Movie's url Fetced From Database", url);

            if (doc) {
                res.status(200).render('info', {
                    Movie: doc,
                    URL: url,
                    SRC: src
                });
            } else {
                res.status(404).json({
                    message: 'You Enterd Non Valid ID For A Movie'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        });


});



router.patch('/:MovieId', (req, res, next) => {
    const id = req.params.MovieId;
    const UpdateOps = {};
    for (const ops of req.body) {
        UpdateOps[ops.propName] = ops.value;
    }
    Movie.update({
            _id: id
        }, {
            $set: UpdateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Movie Updated',
                Request: {
                    Type: 'PATCH',
                    Url: 'http://localhost:3000/movies/' + id
                }
            });
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                Error: err

            });
        });

});
router.delete('/:MovieId', (req, res, next) => {
    const id = req.params.MovieId;
    Movie.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Movie Deleted',
                Request: {
                    Type: 'DELETE',
                    Url: 'http://localhost:3000/movies/'
                }
            });
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                Error: err

            });
        });
});


module.exports = router;