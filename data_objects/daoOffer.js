const db = require("../models/sequelizeConfig");

const Offer = db.offer;

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

