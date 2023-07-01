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

    let result = await caService.postCa(ca);
    if(result===1) {
        res.sendStatus(200)
    }
    else{
        console.log(result)
        res.sendStatus(400)
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