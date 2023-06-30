module.exports = (sequelize, Sequelize) => {
    const Tender = sequelize.define("tender", {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        startDate:{
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        budget: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    });
    return Tender;
};