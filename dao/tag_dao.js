const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const TagInfo = require("../models/TagInfo.js");

let tag_dao = {};

tag_dao.query_all_tags = function () {
    return TagInfo.findAll();
};

module.exports = tag_dao;