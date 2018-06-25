const ad_dao = require("../dao/ad_dao");
let ad_service = {};

// 解析查询到的广告，并格式化返回
ad_service.parse_ads = function (ads, tagsDict) {
    console.log("ads length: " + ads.length);
    let result = [];
    ads.forEach((ad) => {
        let tags = [];
        ad.tagIds.split(",").forEach(id => {
            tags.push(tagsDict[id][0]);
        });
        let oneAd = {
            "id": ad.id,
            "fineClass": ad.fineClass,
            "lambdaFileAddr": ad.lambdaFile,
            "mainBrand": ad.mainBrand,
            "manufacturer": ad.manufacturer,
            "description": ad.proDescription,
            "tags": tags
        };
        result.push(oneAd);
    });
    return result;
};

ad_service.get_ads = function (pageNum, pageSize, searchText) {
    let result = {};
    let tagsDict = {};
    return Promise.all([
        ad_dao.query_ads(pageNum, pageSize, searchText),
        ad_dao.get_ads_count(searchText),
        ad_dao.query_all_tags(),
    ])
        .then(values => {
            let ads = values[0], count = values[1], tags = values[2];
            tags.forEach(tag => {
                tagsDict[tag.id] = [tag.tagName, tag.freq]
            });
            result.data = ad_service.parse_ads(ads, tagsDict);  // 解析从数据库中取到的ads并格式化
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