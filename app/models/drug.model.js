module.exports = (sequelize, Sequelize) => {
    const Drug = sequelize.define("drug", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        min_dose: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        max_dose: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        available_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Drug;
};