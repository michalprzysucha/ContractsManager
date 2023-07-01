/*
    Tender Controller
 */

const tenderService = require('../services/tenderService');
const caService = require('../services/contractingAuthorityService');

const getActiveTenders = async(req,res) => {
    const activeTenders =  await tenderService.getActiveTenders();
    res.render("tendersTable", {title: "Aktywne przetargi", tenders: activeTenders})
}

const getClosedTenders = async(req,res) => {
    const closedTenders =  await tenderService.getClosedTenders();
    res.render("tendersTable", {title: "Zakończone przetargi", tenders: closedTenders})

}

const getTenderDetails = async(req,res) => {
    const tender =  await tenderService.getTenderDetails(req.params.id);
    res.json(tender);
}

const getTenderCreationForm = async(req,res) => {
    const contractingAuthorities = await caService.getCa();
    res.render("tenderForm", {ca: contractingAuthorities, success: 0})
}

const postTender = async(req,res) => {
    const contractingAuthorities = await caService.getCa();
    const tender = {
        name: req.body.tender_name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        description: req.body.desc,
        budget: req.body.budget,
        contractingAuthorityId: req.body.ca
    };

    let success = await tenderService.postTender(tender);
    res.render("tenderForm", {ca: contractingAuthorities, success: success});
}

module.exports = {
    getActiveTenders,
    getClosedTenders,
    getTenderDetails,
    getTenderCreationForm,
    postTender
}