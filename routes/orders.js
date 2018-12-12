const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {


    res.status(200).json({
        message: 'Order Was Fetced'
    });
});
router.post('/', (req, res, next) => {


    res.status(201).json({
        message: 'Order Was Created'
    });
});
router.get('/:OrderId', (req, res, next) => {


    res.status(200).json({
        message: 'Order Details',
        OrderId: req.params.OrderId
    });
});
router.delete('/:OrderId', (req, res, next) => {


    res.status(200).json({
        message: 'Order Deleted',
        OrderId: req.params.OrderId
    });
});


module.exports = router;