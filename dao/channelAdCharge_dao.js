const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ChannelAdCharge = require("../models/ChannelAdCharge.js");

let channelAdCharge_dao = {};

channelAdCharge_dao.query_max_scopeId_by_channelId = function (channelId) {
    return ChannelAdCharge.max("scopeId", {
        where: {
            "channelId": channelId
        }
    });
};

channelAdCharge_dao.query_charge_by_channelId = function (channelId) {
    return ChannelAdCharge.findAll({
        where: {
            "channelId": channelId
        }
    });
};

channelAdCharge_dao.create_charge = function (channelId, scopeId, weekDay, proBefore, proAfter, startTime, endTime, stage1, stage2, stage3) {
    return ChannelAdCharge.create({
        "channelId": channelId,
        "scopeId": scopeId,
        "weekDay": weekDay,
        "proBefore": proBefore,
        "proAfter": proAfter,
        "startTime": startTime,
        "endTime": endTime,
        "stage1": stage1,
        "stage2": stage2,
        "stage3": stage3
    });
};

channelAdCharge_dao.update_charge = function (channelId, scopeId, params) {
    return ChannelAdCharge.update(params, {
        where: {
            "channelId": channelId,
            "scopeId": scopeId
        }
    });
};

channelAdCharge_dao.delete_charge = function (channelId, scopeId) {
    return ChannelAdCharge.destroy({
        where: {
            "channelId": channelId,
            "scopeId": scopeId
        }
    });
};

module.exports = channelAdCharge_dao;

