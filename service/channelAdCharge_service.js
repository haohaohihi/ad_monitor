const channelAdCharge_dao = require("../dao/channelAdCharge_dao");
let channelAdCharge_service = {};

channelAdCharge_service.get_charges_by_channel = function (channelId) {
    let result = {
        "data": [],
    };
    return channelAdCharge_dao.query_charge_by_channelId(channelId).then(charges => {
        charges.forEach(charge => {
            result.data.push({
                "scopeId": charge.scopeId,
                "weekDay": charge.weekDay,
                "proBefore": charge.proBefore,
                "proAfter": charge.proAfter,
                "startTime": charge.startTime,
                "endTime": charge.endTime,
                "stage1": charge.stage1,
                "stage2": charge.stage2,
                "stage3": charge.stage3
            });
        });
        result = channelAdCharge_service.add2result(result);
        return result;
    }).catch(err => {
        console.log(err.message);
        return {
            "status": -200,
            "msg": "读取数据错误"
        }
    });
};

channelAdCharge_service.create_charge = function (channelId, req_data) {
    return channelAdCharge_dao.query_max_scopeId_by_channelId(channelId).then(count => {
        if (isNaN(count)) {
            count = 0;
        }
        return channelAdCharge_dao.create_charge(channelId, count + 1, req_data.weekDay, req_data.proBefore, req_data.proAfter,
            req_data.startTime, req_data.endTime, req_data.stage1, req_data.stage2, req_data.stage3).then(charge => {
            return {
                "status": 0,
                "msg": "success",
                "channelId": charge.channelId,
                "scopeId": charge.scopeId
            }
        });
    }).catch(err => {
        console.log(err.message);
        if (err.message.indexOf("notNull Violation") != -1) {
            return {
                "status": -302,
                "msg": "创建频道失败,缺少参数",
                "channelId": channelId,
            }
        } else if (err.message == "Validation error") {
            return {
                "status": -300,
                "msg": "该频道在本时段的收费数据已存在",
                "channelId": channelId
            }
        }
        else {
            return {
                "status": -300,
                "msg": "创建频道收费记录失败",
                "channelId": channelId,
            };
        }
    });
};

channelAdCharge_service.update_charge = function (channelId, scopeId, req_data) {
    console.log("update charge data, channelId: " + channelId + "scopeId: " + scopeId);
    console.log(req_data);
    return channelAdCharge_dao.update_charge(channelId, scopeId, req_data).then(res => {
        if (res == 1) {
            return {
                "channelId": channelId,
                "scopeId": scopeId,
                "status": 0,
                "msg": "success",
                "count": 1
            };
        } else {
            return {
                "channelId": channelId,
                "scopeId": scopeId,
                "id": id,
                "status": 0,
                "msg": "未更新数据"
            };
        }
    }).catch(err => {
        if ("Query was empty" == err.message) {
            return {
                "channelId": channelId,
                "scopeId": scopeId,
                "status": -201,
                "msg": "待更新的收费记录不存在"
            }
        }
        return {
            "channelId": channelId,
            "scopeId": scopeId,
            "status": -301,
            "msg": "更新数据失败",
        };
    });
};

channelAdCharge_service.delete_charges = function (channelId, scopeIds) {
    let promises = [];
    let count = 0;
    console.log(scopeIds);
    scopeIds.forEach(id => {
        promises.push(channelAdCharge_dao.delete_charge(channelId, id).then(res => {
            if (res == 1) {
                return 1;
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
            "channelId": channelId,
            "msg": "成功删除",
            "count": count,
        };
    });
};

channelAdCharge_service.add2result = function (result) {
    result.rowNames = [  //要展示列的中文名，不包含scopeId
        {
            "ch_name": "周天",
            "eg_name": "weekDay"
        },
        {
            "ch_name": "前节目",
            "eg_name": "proBefore"
        },
        {
            "ch_name": "后节目",
            "eg_name": "proAfter"
        },
        {
            "ch_name": "开始时间",
            "eg_name": "startTime"
        },
        {
            "ch_name": "结束时间",
            "eg_name": "endTime"
        },
        {
            "ch_name": "5秒费用",
            "eg_name": "stage1"
        },
        {
            "ch_name": "10秒费用",
            "eg_name": "stage2"
        },
        {
            "ch_name": "15秒费用",
            "eg_name": "stage3"
        }
    ];
    result.status = 0;
    result.msg = "success";
    return result;
};

module.exports = channelAdCharge_service;