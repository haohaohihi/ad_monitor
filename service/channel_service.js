const channel_dao = require("../dao/channel_dao");
let channel_service = {};

channel_service.get_channels_by_names_areas = function (pageNum, pageSize, req_data) {
    let params = {};
    let result = {
        "data": [],
    };
    Object.keys(req_data).forEach(key => {
        let data = req_data[key];
        if (data.startsWith("[") && data.endsWith("]") && data.length > 2) {
            params[key] = data.substr(1, data.length - 2).split(",");
        }
    });

    return channel_dao.query_channels_count_by_names_areas(params).then(count => {
        return channel_dao.query_channels_by_names_areas(pageNum, pageSize, params).then(channels => {
            channels.forEach(channel => {
                result.data.push(channel.dataValues);
                result.total = Math.ceil(count / pageSize);
                result = channel_service.add2result(result);
            });
            if (result.total < pageNum) {
                return {
                    status: -201,
                    msg: "没有数据"
                };
            }
            return result;
        }).catch(err => {
            return {
                status: -200,
                msg: "读取数据错误"
            }
        });
    });
};

channel_service.create_channel = function (req_data) {
    console.log("create_channel data: ", req_data);
    return channel_dao.query_channels_max_id().then(count => {
        return channel_dao.add_channel(count + 1, req_data.name, req_data.area, req_data.province,
            req_data.city, req_data.coverArea, req_data.coverProvince, req_data.coverCity).then(channel => {
            return {
                "status": 0,
                "msg": "success",
                "id": channel.id
            };
        });
    }).catch(err => {
        console.error(err.message);
        if (err.message.indexOf("notNull Violation") != -1) {
            return {
                "status": -302,
                "msg": "创建频道失败,缺少参数"
            }
        } else if (err.message == "Validation error") {
            return {
                "status": -300,
                "msg": "该频道已存在"
            }
        }
        return {
            "status": -300,
            "msg": "创建频道失败"
        }
    });
};

channel_service.update_channel = function (id, req_data) {
    return channel_dao.update_channel(id, req_data).then(res => {
        if (res == 1) {
            return {
                "id": id,
                "status": 0,
                "msg": "success",
                "count": 1
            }
        } else {
            return {
                "id": id,
                "status": 0,
                "msg": "未更新数据"
            }
        }
    }).catch(err => {
        if ("Query was empty" == err.message) {
            return {
                status: -201,
                msg: "待更新的频道不存在"
            }
        }
        return {
            "status": -301,
            "msg": "更新数据失败",
            "id": id
        };
    });
};

channel_service.delete_channels = function (ids) {
    let promises = [];
    let count = 0;
    ids.forEach(id => {
        promises.push(channel_dao.delete_channel(id).then(res => {
            if (res === 1) {
                return 1
            }
            return 0;
        }).catch(err => {
            return 0;
        }));
    });
    return Promise.all(promises).then(values => {
        values.forEach(val => {
            count += val;
        });
    }).then(res => {
        return {
            "status": 0,
            "msg": "成功删除",
            "count": count
        }
    });
};


channel_service.add2result = function (result) {
    result.rowNames = [   //要展示的列及其中文名，不包含id
        {
            "eg_name": "name",
            "ch_name": "名称"
        },
        {
            "eg_name": "area",
            "ch_name": "区域"
        },
        {
            "eg_name": "province",
            "ch_name": "省份"
        },
        {
            "eg_name": "city",
            "ch_name": "城市"
        },
        {
            "eg_name": "coverArea",
            "ch_name": "覆盖区域"
        },
        {
            "eg_name": "coverProvince",
            "ch_name": "覆盖份"
        },
        {
            "eg_name": "coverCity",
            "ch_name": "覆盖城"
        }
    ];
    result.status = 0;
    result.msg = "success";
    return result;
};
module.exports = channel_service;