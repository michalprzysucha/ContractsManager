/*
    Offer Service
 */

const daoOffer = require('../data_objects/daoOffer');

const postOffer = async(offer) => {
    return await daoOffer.addOffer(offer);
}

module.exports = {
    postOffer
}
