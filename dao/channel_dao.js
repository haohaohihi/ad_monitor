const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ChannelInfo = require("../models/ChannelInfo");

let channel_dao = {};

channel_dao.query_all_channels = function () {
    return ChannelInfo.findAll();
};

module.exports = channel_dao;