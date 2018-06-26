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

ad_service.get_ads = function (pageNum, pageSize, searchText) {
    let catgs = {};
    let result = {};
    return ad_dao.query_ads_count(searchText).then(count => {
        console.log(count);
        return Promise.all([
            catg_dao.query_all_catgs(),
            ad_dao.query_ads(pageNum, pageSize, searchText)
        ]).then(values => {
            let catgs_temp = values[0], ads = values[1];
            catgs_temp.forEach(catg => {
                catgs[catg.id] = [catg.firstCATG, catg.secondCATG, catg.thirdCATG]
            });
            console.log(catgs);
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