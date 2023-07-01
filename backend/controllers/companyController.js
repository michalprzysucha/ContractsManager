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

    let result = await companyService.postCompany(company);
    if(result===1) {
        res.sendStatus(200)
    }
    else{
        console.log(result)
        res.sendStatus(400)
    }
}

module.exports = {
    getCompanyCreationForm,
    postCompany
}