const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AdInfo = require("../models/AdInfo.js");

let ad_dao = {};

// 获取广告表中最大的id
ad_dao.query_ad_max_id = function () {
    return AdInfo.max("id");
};

// 获取查询广告结果总数
ad_dao.query_ads_count = function (searchText) {
    let query_params = {};
    if (searchText) {
        query_params.where = {
            mainBrand: {
                [Op.like]: "%" + searchText + "%",
            }
        }
    }
    return AdInfo.count(query_params);
};

// 查询指定广告，并分页返回
ad_dao.query_ads = function (pageNum, pageSize, searchText) {
    let query_params = {
        limit: Number(pageSize),
        offset: (pageNum - 1) * pageSize,
    };
    if (searchText) {
        query_params.where = {
            mainBrand: {
                [Op.like]: "%" + searchText + "%",
            }
        }
    }
    return AdInfo.findAll(query_params);
};

// 增加一条广告记录
ad_dao.add_ad = function (id, catgId, agentId, lambdaFile, mainBrand,
                          manufacturer, proDescription, verDescription, lang, tags) {
    return AdInfo.create({
        "id": id,
        "catgId": catgId,
        "agentId": agentId,
        "lambdaFile": lambdaFile,
        "verDescription": verDescription,
        "mainBrand": mainBrand,
        "manufacturer": manufacturer,
        "lang": lang,
        "proDescription": proDescription,
        "tags": tags
    });
};

// 更新指定id的广告记录
ad_dao.update_ad = function (id, params) {
    return AdInfo.update(params, {
        where: {
            "id": id
        }
    });
};

// 删除指定id的广告
ad_dao.delete_ad = function (id) {
    return AdInfo.destroy({
        where: {
            "id": id
        }
    });
};

module.exports = ad_dao;