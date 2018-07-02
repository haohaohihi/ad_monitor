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
        primaryKey: true
    },
    weekDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    proBefore: {
        type: Sequelize.STRING(1000)
    },
    proAfter: {
        type: Sequelize.STRING(1000),
    },
    startTime: {
        type: Sequelize.TIME,
    },
    endTime: {
        type: Sequelize.TIME,
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