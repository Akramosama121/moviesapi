const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
    //reject file 
    if (file.mimetye === 'image/jep' || file.mimetye === 'image/png') { cb(null, true); }
    //accept file
    else { cb(null, false); }


};
const upload = multer({ storage: Storage, limits: { fileSize: 1024 * 1024 * 2 } });


const Movie = require('../models/movies');
router.get('/', (req, res, next) => {
    Movie.find()
        .select('CoverImage name genre publisYear Director Actors ProductionCompanies Producers Budget imdbrating rottertomattosrating description price')
        .exec()
        .then(docs => {
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
                        Request: {
                            Type: 'Get',
                            Url: 'http://localhost:3000/movies/' + doc._id
                        }
                    }
                })
            };
            // if (docs.length >= 0) {
            res.status(200).json(response);
            //} else {
            //  res.status(404).json({
            //    Message: 'No Movies Found'
            //});
            //}

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({

                Error: err
            });
        });
});

router.post('/', upload.single('CoverImage'), (req, res, next) => {
    console.log(req.file);
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
        CoverImage: req.file.path

    });
    movie.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Adding Movie\'s Operatrion Sucessful',
                CreatedMovie: {
                    name: result.name,
                    genre: result.genre,
                    publisYear: result.publisYear,
                    Director: result.Director,
                    Actors: result.Actors,
                    ProductionCompanies: result.ProductionCompanies,
                    Producers: result.Producers,
                    Budget: result.Budget,
                    imdbrating: result.imdbrating,
                    rottertomattosrating: result.rottertomattosrating,
                    description: result.description,
                    price: result.price,
                    CoverImage: result.CoverImage,
                    MovieId: result._id,
                    Request: {
                        Type: 'Post',
                        Url: 'http://localhost:3000/movies/' + result._id
                    }
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

router.get('/:MovieId', (req, res, next) => {
    const id = req.params.MovieId;
    Movie.findById(id)
        .select('CoverImage name genre publisYear Director Actors ProductionCompanies Producers Budget imdbrating rottertomattosrating description price')
        .exec()
        .then(doc => {
            console.log("Here's Your Movie Fetced From Database", doc);
            if (doc) {
                res.status(200).json({
                    Header: 'Here\'s Your Movie Info :- ',
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
                    Request: {
                        Type: 'Get',
                        Url: 'http://localhost:3000/movies/' + doc._id
                    }
                });
            } else {
                res.status(404).json({ message: 'You Enterd Non Valid ID For A Movie' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ Error: err })
        });


});
router.patch('/:MovieId', (req, res, next) => {
    const id = req.params.MovieId;
    const UpdateOps = {};
    for (const ops of req.body) {
        UpdateOps[ops.propName] = ops.value;
    }
    Movie.update({ _id: id }, { $set: UpdateOps })
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
    Movie.remove({ _id: id })
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