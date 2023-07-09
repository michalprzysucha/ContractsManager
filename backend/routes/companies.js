var express = require('express');
var router = express.Router();

const companyController = require('../controllers/companyController');

/* GET request for creating new company. */
router.get('/add', companyController.getCompanyCreationForm);

/* POST request for creating new company. */
router.post('/add', companyController.postCompany);

/* GET request for getting all companies. */
router.get('/list_comp', companyController.getComps);

module.exports = router;
