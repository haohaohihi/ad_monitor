const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AdInfo = require("../models/AdInfo.js");

let ad_dao = {};

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

module.exports = ad_dao;