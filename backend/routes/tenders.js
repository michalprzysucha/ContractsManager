var express = require('express');
var router = express.Router();

const tenderController = require('../controllers/tenderController');

/* GET active tenders listing. */
router.get('/', tenderController.getActiveTenders);

/* GET closed tenders listing. */
router.get('/closed', tenderController.getClosedTenders);

/* GET inactive tenders listing. */
router.get('/inactive', tenderController.getInactiveTenders);

/* GET top active tenders */
router.get('/top-active', tenderController.getTopActiveTenders);

/* GET expiring tenders */
router.get('/expiring', tenderController.getExpiringTenders);

/* GET tenders with the biggest budget */
router.get('/top-budget', tenderController.getTopBudgetTenders);

/* GET tender details */
router.get('/:id', tenderController.getTenderDetails);

/* POST request for creating new tender. */
router.post('/add', tenderController.postTender);

module.exports = router;
