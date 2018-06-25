const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AdCategoryInfo = require("../models/AdCategoryInfo.js");

let catg_dao = {};

catg_dao.query_all_catgs = function () {
    return AdCategoryInfo.findAll();
};

catg_dao.query_first_catgs = function () {
    return AdCategoryInfo.findAll({
        attributes: ['firstCATG'],
        group: ['firstCATG']
    });
};

catg_dao.query_second_catgs = function (firstCATG) {
    return AdCategoryInfo.findAll({
        attributes: ['firstCATG', 'secondCATG'],
        where: {
            'firstCATG': firstCATG
        }
    });
};

catg_dao.query_third_catgs = function (firstCATG, secondCATG) {
    return AdCategoryInfo.findAll({
        attributes: ['firstCATG', 'secondCATG', 'thirdCATG'],
        where: {
            'firstCATG': firstCATG,
            'secondCATG': secondCATG
        }
    });
};

module.exports = catg_dao;