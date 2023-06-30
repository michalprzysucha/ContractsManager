/*
    Tender Service
 */

const daoTender = require('../data_objects/daoTender');

const getActiveTenders = async () => {
    return await daoTender.activeTenders();
}

const getClosedTenders = async() => {
    return await daoTender.closedTenders();
}

const getTenderDetails = async(id) => {
    return await daoTender.tenderDetails(id);
}

const postTender = async(tender) => {
    return await daoTender.addTender(tender);
}

module.exports = {
    getActiveTenders,
    getClosedTenders,
    getTenderDetails,
    postTender
}
