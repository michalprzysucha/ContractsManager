/*
    Contracting Authority Controller
 */

const caService = require('../services/contractingAuthorityService');

const getCaCreationForm = async(req,res) => {
    res.render("ContractingAuthorityForm", {success: 0});
}

const postCa = async(req,res) => {
    const ca = {
        name: req.body.name
    };

    let success = await caService.postCa(ca);
    if(success) {
        res.sendStatus(200)
    }
    else{
        res.send(success);
    }
}

const getCa = async(req,res) => {
    const allInstitutions= await caService.getCa()
    res.json(allInstitutions)
}

module.exports = {
    getCaCreationForm,
    postCa,
    getCa
}