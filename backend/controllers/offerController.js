/*
    Offer Controller
 */

const offerService = require('../services/offerService');

const postOffer = async(req,res) => {
    const offer = {
        submissionDate: new Date(),
        price: req.body.price,
        companyId: req.body.company,
        tenderId: req.params.tenderId
};

    let result = await offerService.postOffer(offer);

    if(result===1) {
        res.sendStatus(200)
    }
    else{
        console.log(result)
        res.sendStatus(400)
    }
}

module.exports = {
    postOffer
}