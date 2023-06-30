module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });
    return Company;
};