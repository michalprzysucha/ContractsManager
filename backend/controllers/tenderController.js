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
    res.render("tenderDetails", {tender: tender[0].dataValues})
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
        res.sendStatus(400)
    }
}

module.exports = {
    getActiveTenders,
    getClosedTenders,
    getTenderDetails,
    getTenderCreationForm,
    postTender
}