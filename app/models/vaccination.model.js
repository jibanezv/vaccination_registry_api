module.exports = (sequelize, Sequelize) => {
    const Vaccination = sequelize.define("vaccination", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        drug_id: {
            type: Sequelize.INTEGER
        },
        dose: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        }
    });

    return Vaccination;
};