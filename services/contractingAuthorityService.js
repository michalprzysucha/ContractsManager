/*
    Contracting authority Service
 */

const daoCa = require('../data_objects/daoContractingAuthority');

const postCa = async(ca) => {
    return await daoCa.addCa(ca);
}

const getCa = async() => {
    return await daoCa.getCa();
}

module.exports = {
    postCa,
    getCa
}
