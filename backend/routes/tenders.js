var express = require('express');
var router = express.Router();

const tenderController = require('../controllers/tenderController');

/* GET active tenders listing. */
router.get('/', tenderController.getActiveTenders);

/* GET closed tenders listing. */
router.get('/closed', tenderController.getClosedTenders);

/* GET request for creating new tender. */
router.get('/add', tenderController.getTenderCreationForm);

/* GET top active tenders */
router.get('/top-active', tenderController.getTopActiveTenders);

/* GET tender details */
router.get('/:id', tenderController.getTenderDetails);

/* POST request for creating new tender. */
router.post('/add', tenderController.postTender);

module.exports = router;
