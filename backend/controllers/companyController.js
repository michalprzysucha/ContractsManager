/*
    Company Controller
 */

const companyService = require('../services/companyService');

const getCompanyCreationForm = async(req,res) => {
    res.render("companyForm", {success: 0});
}

const postCompany = async(req,res) => {
    const company = {
        name: req.body.name
    };

    let success = await companyService.postCompany(company);
    if(success) {
        res.status(200);
    }
    else{
        res.send(success);
    }
}

module.exports = {
    getCompanyCreationForm,
    postCompany
}