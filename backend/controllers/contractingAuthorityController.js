/*
    Contracting Authority Controller
 */

const caService = require('../services/contractingAuthorityService');

const getCaCreationForm = async(req,res) => {
    res.render("ContractingAuthorityForm", {success: 0});
}

const postCa = async(req,res) => {
    const ca = {
        name: req.body.ca_name
    };

    let success = await caService.postCa(ca);
    res.render("ContractingAuthorityForm", {success: success});
}

const getCa = async(req,res) => {
    res.json({institutions: [{id: 15, name: "abcd"},{id: 16, name: "efgh"}]})
}

module.exports = {
    getCaCreationForm,
    postCa,
    getCa
}