/*
    Company Controller
 */

const companyService = require('../services/companyService');

const getCompanyCreationForm = async(req,res) => {
    res.render("companyForm", {success: 0});
}

const postCompany = async(req,res) => {
    const company = {
        name: req.body.company_name
    };

    let success = await companyService.postCompany(company);
    res.render("companyForm", {success: success});
}

module.exports = {
    getCompanyCreationForm,
    postCompany
}