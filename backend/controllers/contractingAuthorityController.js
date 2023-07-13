/*
    Contracting Authority Controller
 */

const caService = require('../services/contractingAuthorityService');

const postCa = async(req,res) => {
    const caName = req.body.name

    const exists = await caService.getCaByName(caName);
    if(exists===null) {
        const ca = {
            name: caName
        };

        let result = await caService.postCa(ca);
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

const getCa = async(req,res) => {
    const allInstitutions= await caService.getCa()
    res.json(allInstitutions)
}

module.exports = {
    postCa,
    getCa
}