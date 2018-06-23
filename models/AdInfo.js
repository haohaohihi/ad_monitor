const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const AdInfo = sequelize.define('AdInfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    catgId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    lambdaFile: {
        type: Sequelize.STRING(2000)
    },
    verDescription: {
        type: Sequelize.STRING(100),
    },
    mainBrand: {
        type: Sequelize.STRING(100),
    },
    manufacturer: {
        type: Sequelize.STRING(100),
    },
    lang: {
        type: Sequelize.STRING(100),
    },
    proDescription: {
        type: Sequelize.STRING(100),
    },
    tagIds: {
        type: Sequelize.STRING(1000),
    },
}, {
    timestamps: false,
    tableName: 'adInfo',
});

module.exports = AdInfo;