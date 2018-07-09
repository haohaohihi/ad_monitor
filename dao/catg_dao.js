const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AdCategoryInfo = require("../models/AdCategoryInfo.js");

let catg_dao = {};

// 根据id查询一个分类
catg_dao.query_one_tag = function (id) {
    return AdCategoryInfo.findById(id);
};

// 查询所有的分类
catg_dao.query_all_catgs = function () {
    return AdCategoryInfo.findAll();
};

// 查询所有的一级分类
catg_dao.query_first_catgs = function () {
    return AdCategoryInfo.findAll({
        attributes: ['firstCATG'],
        group: ['firstCATG']
    });
};

// 查询一级分类下的所有二级分类
catg_dao.query_second_catgs = function (firstCATG) {
    return AdCategoryInfo.findAll({
        attributes: ['secondCATG'],
        where: {
            'firstCATG': firstCATG
        }
    });
};

// 查询一级、二级分类下的所有三级分类
catg_dao.query_third_catgs = function (firstCATG, secondCATG) {
    return AdCategoryInfo.findAll({
        attributes: ['thirdCATG'],
        where: {
            'firstCATG': firstCATG,
            'secondCATG': secondCATG
        }
    });
};

// 查询分类表中当前最大的id
catg_dao.query_catgs_max_id = function () {
    return AdCategoryInfo.max("id");
};

// 增加一个一级分类
catg_dao.add_first_catg = function (id, firstCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": "null",
        "thirdCATG": "null"
    });
};

// 增加一个二级分类
catg_dao.add_second_catg = function (id, firstCATG, secondCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": secondCATG,
        "thirdCATG": "null"
    });
};

// 增加一个三级分类
catg_dao.add_third_catg = function (id, firstCATG, secondCATG, thirdCATG) {
    return AdCategoryInfo.create({
        "id": id,
        "firstCATG": firstCATG,
        "secondCATG": secondCATG,
        "thirdCATG": thirdCATG
    });
};

// 更新指定id分类的详细信息
catg_dao.update_catg = function (id, tagTitle, name) {
    let params = {};
    params[tagTitle] = name;
    return AdCategoryInfo.update(params, {
        where: {
            "id": id
        }
    });
};

// 删除指定id的分类
catg_dao.delete_catg = function (id) {
    return AdCategoryInfo.destroy({
        where: {
            "id": id
        }
    });
};

module.exports = catg_dao;