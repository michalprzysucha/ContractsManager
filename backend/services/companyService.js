/*
    Company Service
 */

const daoCompany = require('../data_objects/daoCompany');

const postCompany = async(company) => {
    return await daoCompany.addCompany(company);
}

const getCompanies = async() => {
    return await daoCompany.getCompanies();
}

const getCompanyByName = async(name) => {
    return await daoCompany.getCompanyByName(name);
}


module.exports = {
    postCompany,
    getCompanies,
    getCompanyByName
}
