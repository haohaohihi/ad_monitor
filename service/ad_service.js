const ad_dao = require("../dao/ad_dao");
const catg_dao = require("../dao/catg_dao");
let ad_service = {};

// 解析查询到的广告，并格式化返回
ad_service.parse_ads = function (ads, catgs) {
    console.log("ads length: " + ads.length);
    let result = [];
    ads.forEach((ad) => {
        let oneAd = {
            "id": ad.id,
            "fineClass": catgs[ad.catgId],
            "lambdaFileAddr": ad.lambdaFile,
            "mainBrand": ad.mainBrand,
            "manufacturer": ad.manufacturer,
            "description": ad.proDescription,
            "tags": ad.tags.split(",")
        };
        result.push(oneAd);
    });
    return result;
};

// 获取广告信息,并分页返回
ad_service.get_ads = function (pageNum, pageSize, searchText) {
    let catgs = {};
    let result = {};
    return ad_dao.query_ads_count(searchText).then(count => {
        return Promise.all([
            catg_dao.query_all_catgs(),
            ad_dao.query_ads(pageNum, pageSize, searchText)
        ]).then(values => {
            let catgs_temp = values[0], ads = values[1];
            catgs_temp.forEach(catg => {
                catgs[catg.id] = [catg.firstCATG, catg.secondCATG, catg.thirdCATG]
            });
            result.data = ad_service.parse_ads(ads, catgs);
            result.total = Math.ceil(count / pageSize);     // 计算总页数
            result = ad_service.add2result(result);         // 加入rowNames字段
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
            };
        });
    });
};

ad_service.create_ad = function (catgId, agentId, lambdaFile, mainBrand,
                                 manufacturer, proDescription, verDescription, lang, tags) {
    tags = tags.substr(1, tags.length - 2);
    return catg_dao.query_one_tag(catgId).then(res => {
        if (!res) {
            return {
                "status": -201,
                "msg": "传入的分类不存在"
            };
        } else {
            return ad_dao.query_ad_max_id().then(count => {
                return ad_dao.add_ad(count + 1, catgId, agentId, lambdaFile, mainBrand,
                    manufacturer, proDescription, verDescription, lang, tags).then(ad => {
                    return {
                        "status": 0,
                        "msg": "succuss",
                        "id": ad.id
                    };
                });
            }).catch(err => {
                return {
                    "status": -300,
                    "msg": "数据已存在",
                }
            });
        }
    });
};

ad_service.update_ad = function (id, req_data) {
    params = {};
    Object.keys(req_data).forEach(key => {
        if ("lambdaFileAddr" == key) {
            params["lambdaFile"] = req_data.lambdaFileAddr;
        } else if ("description" == key) {
            params["proDescription"] = req_data.description;
        } else if ("tags" == key) {
            params["tags"] = req_data.tags.substr(1, req_data.tags.length - 2);
        } else {
            params[key] = req_data[key];
        }
    });
    return ad_dao.update_ad(id, params).then(res => {
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
                msg: "待更新的广告不存在"
            }
        }
        return {
            "status": -301,
            "msg": "更新数据失败",
            "id": id
        };
    });
};

ad_service.delete_ad = function (id) {
    return ad_dao.delete_ad(id).then(count => {
        if (count == 1) {
            return {
                "status": 0,
                "msg": "success",
                "id": id,
                "count": 1
            }
        } else {
            return {
                "status": 0,
                "msg": "该条数据不存在",
                "id": id
            }
        }
    }).catch(err => {
        return {
            "status": -301,
            "msg": "删除数据失败",
            "id": id
        }
    });
};

ad_service.delete_ads = function (ids) {
    let promises = [];
    let count = 0;
    ids.forEach(id => {
        promises.push(ad_dao.delete_ad(id).then(res => {
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

ad_service.add2result = function (result) {
    result.rowNames = [
        {
            "eg_name": "id",    //列字段英文名
            "ch_name": "广告id" //列字段中文名
        },
        {
            "eg_name": "fineClass",
            "ch_name": "小类"
        },
        {
            "eg_name": "mainBrand",
            "ch_name": "主品牌"
        },
        {
            "eg_name": "manufacturer",
            "ch_name": "厂商"
        },
        {
            "eg_name": "description",
            "ch_name": "描述"
        },
        {
            "eg_name": "lambdaFileAddr",
            "ch_name": "文件地址"
        }
    ];
    return result;
};
module.exports = ad_service;