const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');

const ChannelAdCharge = sequelize.define('ChannelAdCharge', {
    channelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    scopeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    weekDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    proBefore: {
        type: Sequelize.STRING(1000)
    },
    proAfter: {
        type: Sequelize.STRING(1000),
    },
    startTime: {
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },
    endTime: {
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },
    stage1: {
        type: Sequelize.INTEGER,
    },
    stage2: {
        type: Sequelize.INTEGER,
    },
    stage3: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false,
    tableName: 'channelAdCharge',
});

module.exports = ChannelAdCharge;