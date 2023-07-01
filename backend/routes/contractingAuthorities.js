var express = require('express');
var router = express.Router();

const caController = require('../controllers/contractingAuthorityController');

/* GET request for creating new institution. */
router.get('/add', caController.getCaCreationForm);

/* POST request for creating new institution. */
router.post('/add', caController.postCa);

/* GET request for getting all institutions. */
router.get('/list', caController.getCa);

module.exports = router;
