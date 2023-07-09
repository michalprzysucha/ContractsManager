/*
    Offer Controller
 */

const offerService = require('../services/offerService');
const companyService = require("../services/companyService");

const postOffer = async(req,res) => {
    const companies = await companyService.getCompanies();
    const offer = {
        submissionDate: new Date(),
        price: req.body.price,
        companyId: req.body.company,
        tenderId: req.params.tenderId
};

    let success = await offerService.postOffer(offer);
    res.render("offerForm", {success: success, companies: companies});
}

module.exports = {
    postOffer
}