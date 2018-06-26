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

catg_service.get_first_catgs = function () {
    return catg_dao.query_first_catgs().then(catgs => {
        let result = [];
        catgs.forEach(catg => {
            result.push(catg.firstCATG);
        });
        return result;
    }).catch(err => {
        return {
            status: -200,
            msg: "读取数据错误"
        };
    });
};

catg_service.get_second_catgs = function (first_catg) {
    return catg_dao.query_second_catgs(first_catg).then(catgs => {
        let result = new Set();
        catgs.forEach(catg => {
            result.add(catg.secondCATG);
        });
        return Array.from(result);
    }).catch(err => {
        return {
            status: -200,
            msg: "读取数据错误"
        };
    });
};

catg_service.get_third_catgs = function (first_catg, second_catg) {
    return catg_dao.query_third_catgs(first_catg, second_catg).then(catgs => {
        let result = new Set();
        catgs.forEach(catg => {
            result.add(catg.thirdCATG);
        });
        return Array.from(result);
    }).catch(err => {
        return {
            status: -200,
            msg: "读取数据错误"
        };
    });
};

catg_service.add_first_catg = function (first_catg) {
    return catg_dao.query_catgs_max_id().then(count => {
        return catg_dao.add_first_catg(count + 1, first_catg).then(catg => {
            return {
                "status": 0,
                "msg": "success",
                "id": catg.id
            };
        }).catch(err => {
            return {
                "status": -300,
                "msg": "数据已存在",
            }
        });
    });
};

catg_service.add_second_catg = function (first_catg, second_catg) {
    return catg_dao.query_catgs_max_id().then(count => {
        return catg_dao.add_second_catg(count + 1, first_catg, second_catg).then(catg => {
            return {
                "status": 0,
                "msg": "success",
                "id": catg.id
            };
        }).catch(err => {
            return {
                "status": -300,
                "msg": "数据已存在",
            }
        });
    });
};

catg_service.add_third_catg = function (first_catg, second_catg, third_catg) {
    return catg_dao.query_catgs_max_id().then(count => {
        return catg_dao.add_third_catg(count + 1, first_catg, second_catg, third_catg).then(catg => {
            return {
                "status": 0,
                "msg": "success",
                "id": catg.id
            };
        }).catch(err => {
            return {
                "status": -300,
                "msg": "数据已存在",
            }
        });
    });
};

catg_service.change_catg = function (id, level, name) {
    let tagTitle;
    if (level == 1) {
        tagTitle = "firstCATG";
    } else if (level == 2) {
        tagTitle = "secondCATG";
    } else if (level == 3) {
        tagTitle = "thirdCATG";
    } else {
        tagTitle = "";
    }
    return catg_dao.update_catg(id, tagTitle, name).then(count => {
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
                "msg": "未更新数据",
                "id": id
            }
        }
    }).catch(err => {
        return {
            "status": -301,
            "msg": "更新数据失败",
            "id": id
        }
    });
};

catg_service.delete_catg = function (id) {
    return catg_dao.delete_catg(id).then(count => {
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

module.exports = catg_service;