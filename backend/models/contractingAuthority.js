module.exports = (sequelize, Sequelize) => {
    const ContractingAuthority = sequelize.define("contractingAuthority", {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });
    return ContractingAuthority;
};