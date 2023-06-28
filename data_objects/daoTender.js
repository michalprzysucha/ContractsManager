const db = require("../models/sequelizeConfig");

const Tender = db.tender;
const Company = db.company;
const ContractingAuthority = db.contractingAuthority;
const Offer = db.offer;

const Op = db.Sequelize.Op;

const activeTenders = () => {
    const now = new Date();

    let attributes = ["id", "name", "startDate", "endDate"];
    let condition = {
        startDate: {
            [Op.lte]: now
        },
        endDate: {
            [Op.gt]: now
        }
    }

    return Tender.findAll({ attributes: attributes, where: condition })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

const closedTenders = () => {
    const now = new Date();

    let attributes = ["id", "name"];
    let condition = {
        endDate: {
            [Op.lte]: now
        }
    }

    return Tender.findAll({ attributes: attributes, where: condition })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

const tenderDetails = (id) => {
    let condition = {
        id: id
    }

    let options = {
        include: [
            { model: ContractingAuthority },
            {
                model: Offer,
                as: "offers",
                include: Company
            }
        ],
        where: condition,
        order: [[Offer, 'price', 'ASC']]
    }

    return Tender.findAll(options)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

const addTender = (tender) => {
    return Tender.create(tender)
        .then(() => {
            return 1;
        })
        .catch(err => {
            return err.message
        });
};

module.exports = {
    activeTenders,
    closedTenders,
    tenderDetails,
    addTender
}

