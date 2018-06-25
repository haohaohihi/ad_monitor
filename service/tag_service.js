const tag_dao = require("../dao/tag_dao");

let tag_service = {};

tag_service.get_all_tags = function () {
    return tag_dao.query_all_tags().then(values => {
        let result = [];
        values.forEach(val => {
            console.log(val.dataValues);
            result.push(val.dataValues)
        });
        return result;
    })
};

module.exports = tag_service;