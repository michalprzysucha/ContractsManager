var express = require('express');
var router = express.Router();

const caController = require('../controllers/contractingAuthorityController');

/* GET request for creating new tender. */
router.get('/add', caController.getCaCreationForm);


/* POST request for creating new tender. */
router.post('/add', caController.postCa);

module.exports = router;
