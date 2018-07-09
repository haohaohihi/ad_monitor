const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ChannelInfo = require("../models/ChannelInfo");

let channel_dao = {};

// 查询频道表中的最大id
channel_dao.query_channels_max_id = function () {
    return ChannelInfo.max("id");
};

// 获取所有的频道记录
channel_dao.query_all_channels = function () {
    return ChannelInfo.findAll();
};

// 根据地区、名称等信息查询频道记录的总数
channel_dao.query_channels_count_by_names_areas = function (params) {
    let where_params = {};
    Object.keys(params).forEach(key => {
        if (params[key].length != 0) {
            where_params[key] = {
                [Op.in]: params[key]
            }
        }
    });
    return ChannelInfo.count({
        where: where_params
    });
};

// 根据地区、名称等信息查询频道记录
channel_dao.query_channels_by_names_areas = function (pageNum, pageSize, params) {
    let where_params = {};
    Object.keys(params).forEach(key => {
        if (params[key].length != 0) {
            where_params[key] = {
                [Op.in]: params[key]
            }
        }
    });
    return ChannelInfo.findAll({
        limit: Number(pageSize),
        offset: (pageNum - 1) * pageSize,
        where: where_params
    });
};

// 新增一个频道记录
channel_dao.add_channel = function (id, name, area, province, city, coverArea, coverProvince, coverCity) {
    return ChannelInfo.create({
        "id": id,
        "name": name,
        "area": area,
        "province": province,
        "city": city,
        "coverArea": coverArea,
        "coverProvince": coverProvince,
        "coverCity": coverCity
    });
};

// 更新指定id的频道记录
channel_dao.update_channel = function (id, params) {
    return ChannelInfo.update(params, {
        where: {
            "id": id
        }
    });
};

// 删除指定id的频道记录
channel_dao.delete_channel = function (id) {
    return ChannelInfo.destroy({
        where: {
            "id": id
        }
    });
};

module.exports = channel_dao;