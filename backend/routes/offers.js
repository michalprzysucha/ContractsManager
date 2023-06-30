var express = require('express');
var router = express.Router();

const offerController = require('../controllers/offerController');

/* GET request for creating new offer. */
router.get('/add/:tenderId', offerController.getOfferCreationForm);

/* POST request for creating new offer. */
router.post('/add/:tenderId', offerController.postOffer);

module.exports = router;
