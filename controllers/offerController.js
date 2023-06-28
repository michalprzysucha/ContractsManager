/*
    Offer Controller
 */

const offerService = require('../services/offerService');
const companyService = require("../services/companyService");

const getOfferCreationForm = async(req,res) => {
    const companies = await companyService.getCompanies();
    res.render("offerForm", {success: 0, companies: companies});
}

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
    getOfferCreationForm,
    postOffer
}