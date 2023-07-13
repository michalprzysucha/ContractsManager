/*
    Company Controller
 */

const companyService = require('../services/companyService');

const postCompany = async(req,res) => {
    const companyName = req.body.name

    const exists = await companyService.getCompanyByName(companyName);
    if(exists===null) {
        const company = {
            name: companyName
        };

        let result = await companyService.postCompany(company);
        if (result === 1) {
            res.sendStatus(200)
        } else {
            console.log(result)
            res.sendStatus(500)
        }
    }
    else{
        res.sendStatus(409)
    }
}

// adding get companies 
const getComps = async(req,res) => {
    const allCompanies= await companyService.getCompanies()
    res.json(allCompanies)
}

module.exports = {
    postCompany,
    getComps
}