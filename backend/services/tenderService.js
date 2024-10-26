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

const getTopBudgetTenders = async() => {
    return await daoTender.topBudgetTenders();
}

const getActiveTenders = async () => {
    return await daoTender.activeTenders();
}

const getClosedTenders = async() => {
    return await daoTender.closedTenders();
}

const getInactiveTenders = async() => {
    return await daoTender.inactiveTenders();
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
    getTopBudgetTenders,
    getActiveTenders,
    getClosedTenders,
    getInactiveTenders,
    getTenderDetails,
    postTender
}
