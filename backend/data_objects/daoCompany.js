const dbConfig = require("../models/sequelizeConfig");

const Company = dbConfig.db.company;

const addCompany = (company) => {
    return Company.create(company)
        .then(() => {
            return 1;
        })
        .catch(err => {
            return err.message
        });
};

const getCompanies = () => {
    return Company.findAll()
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

const getCompanyByName = (companyName) => {
    let condition =  { name: companyName };
    return Company.findOne({ where: condition })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

module.exports = {
    addCompany,
    getCompanies,
    getCompanyByName
}

