const catg_dao = require("../dao/catg_dao");

let catg_service = {};

catg_service.get_all_catgs = function () {
    let catgs_result = {};
    let first = new Set();
    let second = new Set();
    let third = new Set();
    return catg_dao.query_all_catgs().then(catgs => {
        catgs.forEach(catg => {
            first.add(catg.firstCATG);
            second.add(catg.firstCATG + "," + catg.secondCATG);
            third.add(catg.firstCATG + "," + catg.secondCATG + "," + catg.thirdCATG + "," + catg.id);
        });
        first.forEach(catgA => {
            catgs_result[catgA] = {
                "level": 1,
                "name": catgA,
                "children": {},
            };
        });
        second.forEach(catgs => {
            catgA = catgs.split(",")[0];
            catgB = catgs.split(",")[1];
            catgs_result[catgA].children[catgB] = {
                "level": 2,
                "name": catgB,
                "children": []
            };
        });
        third.forEach(catgs => {
            catgA = catgs.split(",")[0];
            catgB = catgs.split(",")[1];
            catgC = catgs.split(",")[2];
            catgId = catgs.split(",")[3];
            catgs_result[catgA].children[catgB].children.push({
                "id": catgId,
                "name": catgC,
                "level": 3,
            });
        });

        final_result = {
            "status": 0,
            "msg": "success",
            "data": []
        };
        Object.keys(catgs_result).forEach(key => {
            let temp_children = catgs_result[key].children;
            // console.log(temp_children);
            let result_children = [];
            Object.keys(temp_children).forEach(key => {
                result_children.push(temp_children[key]);
            });
            catgs_result[key].children = result_children;
            final_result.data.push(catgs_result[key]);
        });

        return final_result;
    }).catch(err => {
        return {
            status: -200,
            msg: "读取数据错误"
        };
    });
};

module.exports = catg_service;