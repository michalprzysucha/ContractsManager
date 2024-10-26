/*
    Tender Controller
 */

const tenderService = require('../services/tenderService');

const getTopActiveTenders = async(req,res) => {
    const tenders =  await tenderService.getTopActiveTenders();
    res.json(tenders);
}

const getExpiringTenders = async(req,res) => {
    const tenders =  await tenderService.getExpiringTenders();
    res.json(tenders);
}

const getTopBudgetTenders = async(req,res) => {
    const tenders =  await tenderService.getTopBudgetTenders();
    res.json(tenders);
}

const getActiveTenders = async(req,res) => {
    const activeTenders =  await tenderService.getActiveTenders();
    res.json(activeTenders);
}

const getClosedTenders = async(req,res) => {
    const closedTenders =  await tenderService.getClosedTenders();
    res.json(closedTenders);
}

const getInactiveTenders = async(req,res) => {
    const inactiveTenders =  await tenderService.getInactiveTenders();
    res.json(inactiveTenders);
}

const getTenderDetails = async(req,res) => {
    const tender =  await tenderService.getTenderDetails(req.params.id);
    res.json(tender);
}

const postTender = async(req,res) => {
    const tender = {
        name: req.body.tender_name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        description: req.body.description,
        budget: req.body.budget,
        contractingAuthorityId: req.body.ca
    };

    let result = await tenderService.postTender(tender);

    if(result===1) {
        res.sendStatus(200)
    }
    else{
        console.log(result)
        res.sendStatus(500)
    }
}

module.exports = {
    getTopActiveTenders,
    getTopBudgetTenders,
    getExpiringTenders,
    getActiveTenders,
    getClosedTenders,
    getInactiveTenders,
    getTenderDetails,
    postTender
}