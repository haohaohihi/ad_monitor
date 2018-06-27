const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AdCategoryInfo = require("../models/AdCategoryInfo.js");

let catg_dao = {};

catg_dao.query_one_tag = function (id) {
    return AdCategoryInfo.findById(id);
};

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
        attributes: ['secondCATG'],
        where: {
            'firstCATG': firstCATG
        }
    });
};

catg_dao.query_third_catgs = function (firstCATG, secondCATG) {
    return AdCategoryInfo.findAll({
        attributes: ['thirdCATG'],
        where: {
            'firstCATG': firstCATG,
            'secondCATG': secondCATG
        }
    });
};

catg_dao.query_catgs_max_id = function () {
    return AdCategoryInfo.max("id");
};

catg_dao.add_first_catg = function (id, firstCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": "null",
        "thirdCATG": "null"
    });
};

catg_dao.add_second_catg = function (id, firstCATG, secondCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": secondCATG,
        "thirdCATG": "null"
    });
};

catg_dao.add_third_catg = function (id, firstCATG, secondCATG, thirdCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": secondCATG,
        "thirdCATG": thirdCATG
    });
};

catg_dao.update_catg = function (id, tagTitle, name) {
    let params = {};
    params[tagTitle] = name;
    return AdCategoryInfo.update(params, {
        where: {
            "id": id
        }
    });
};

catg_dao.delete_catg = function (id) {
    return AdCategoryInfo.destroy({
        where: {
            "id": id
        }
    });
};

module.exports = catg_dao;