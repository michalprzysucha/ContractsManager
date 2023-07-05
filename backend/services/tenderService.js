/*
    Tender Service
 */

const daoTender = require('../data_objects/daoTender');

const getTopActiveTenders = async() => {
    return await daoTender.topActiveTenders();
}

const getExpiringTenders = async() => {
    return await daoTender.expiringTenders();
}

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
    getTopActiveTenders,
    getExpiringTenders,
    getActiveTenders,
    getClosedTenders,
    getTenderDetails,
    postTender
}
