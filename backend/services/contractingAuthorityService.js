/*
    Contracting authority Service
 */

const daoCa = require('../data_objects/daoContractingAuthority');
const daoCompany = require("../data_objects/daoCompany");

const postCa = async(ca) => {
    return await daoCa.addCa(ca);
}

const getCa = async() => {
    return await daoCa.getCa();
}

const getCaByName = async(name) => {
    return await daoCa.getCaByName(name);
}

module.exports = {
    postCa,
    getCa,
    getCaByName
}
