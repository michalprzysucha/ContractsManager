module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define("offer", {
        submissionDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        price:{
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    });
    return Offer;
};