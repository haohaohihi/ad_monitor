const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const ChannelInfo = sequelize.define('ChannelInfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    area: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    province: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    coverArea: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    coverProvince: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    coverCity: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'channelInfo',
});

module.exports = ChannelInfo;