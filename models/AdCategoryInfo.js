const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const AdCategoryInfo = sequelize.define('AdCategoryInfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstCATG: {
        type: Sequelize.STRING(100),
        allowNull:false,
    },
    secondCATG: {
        type: Sequelize.STRING(100),
        allowNull:true,
    },
    thirdCATG: {
        type: Sequelize.STRING(100),
        allowNull:true,
    },
}, {
    timestamps: false,
    tableName: 'adCategoryInfo',
    indexes: [
        {
            unique: true,
            fields: ['firstCATG', 'secondCATG', 'thirdCATG']
        }
    ]
});

module.exports = AdCategoryInfo;