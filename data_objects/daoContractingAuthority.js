const db = require("../models/sequelizeConfig");

const ContractingAuthority = db.contractingAuthority;

const addCa = (ca) => {
    return ContractingAuthority.create(ca)
        .then(() => {
            return 1;
        })
        .catch(err => {
            return err.message
        });
};

const getCa = () => {
    return ContractingAuthority.findAll()
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

module.exports = {
    addCa,
    getCa
}

