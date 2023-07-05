const dbConfig = require("../models/sequelizeConfig");

const Offer = dbConfig.db.offer;

const addOffer = (offer) => {
    return Offer.create(offer)
        .then(() => {
            return 1;
        })
        .catch(err => {
            return err.message
        });
};

module.exports = {
    addOffer
}

