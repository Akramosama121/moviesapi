const express = require('express');
const router = express.Router();
router.post('/', (req, res, next) => {

    res.status(201).json({
        message: 'Handling Post requests To /movies'
    });
});
router.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'Handling Get requests To /movies'
    });
});
router.get('/:MovieId', (req, res, next) => {
    const id = req.params.MoviesId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You Discoverd The Special Id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You Made A Request',
            id: id
        });
    }


});
router.patch('/:MovieId', (req, res, next) => {

    res.status(200).json({
        message: 'Updated This Movie!'
    });
});
router.delete('/:MovieId', (req, res, next) => {

    res.status(200).json({
        message: 'Deleted This Movie!'
    });
});

module.exports = router;