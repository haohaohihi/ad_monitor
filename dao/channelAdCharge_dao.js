const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ChannelAdCharge = require("../models/ChannelAdCharge.js");

let channelAdCharge_dao = {};

// 查询指定频道id中的最大的scopeId
channelAdCharge_dao.query_max_scopeId_by_channelId = function (channelId) {
    return ChannelAdCharge.max("scopeId", {
        where: {
            "channelId": channelId
        }
    });
};

// 查询指定id频道的收费表
channelAdCharge_dao.query_charge_by_channelId = function (channelId) {
    return ChannelAdCharge.findAll({
        where: {
            "channelId": channelId
        }
    });
};

// 新增一条频道收费信息记录
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

// 更新指定频道、scopeId的收费信息
channelAdCharge_dao.update_charge = function (channelId, scopeId, params) {
    return ChannelAdCharge.update(params, {
        where: {
            "channelId": channelId,
            "scopeId": scopeId
        }
    });
};

// 删除一条收费记录
channelAdCharge_dao.delete_charge = function (channelId, scopeId) {
    return ChannelAdCharge.destroy({
        where: {
            "channelId": channelId,
            "scopeId": scopeId
        }
    });
};

module.exports = channelAdCharge_dao;

