const dbConfig = require("../models/sequelizeConfig");

const Tender = dbConfig.db.tender;
const Company = dbConfig.db.company;
const ContractingAuthority = dbConfig.db.contractingAuthority;
const Offer = dbConfig.db.offer;

const Op = dbConfig.db.Sequelize.Op;

const topActiveTenders = () => {
    const now = new Date();
    let condition = {
        startDate: {
            [Op.lte]: now
        },
        endDate: {
            [Op.gt]: now
        }
    }

    let options = {
        attributes: ['Tender.id', 'Tender.name', [dbConfig.sequelize.fn('COUNT', 'Offer.id'), 'offers_count']],
        include: [
            {
                model: Tender,
                attributes: [],
                include: [],
                where: condition
            }
        ],
        group: ['Tender.id'],
        order: [[dbConfig.sequelize.literal('offers_count'), 'DESC']],
        limit: 5,
        raw: true
    }

    return Offer.findAll(options)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        });
};

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

    return Tender.findOne(options)  // findOne?
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
    topActiveTenders,
    activeTenders,
    closedTenders,
    tenderDetails,
    addTender
}

