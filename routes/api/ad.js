const express = require('express');
const router = express.Router();
const ad_service = require("../../service/ad_service");
/* GET home page. */
router.get('/', function (req, res) {
    let pageNum = req.query.pageNum;
    let pageSize = req.query.pageSize;
    let searchText = req.query.searchText;
    if (isNaN(pageNum) || isNaN(pageSize)) {
        res.json({
            status: -100,
            msg: "请求参数错误"
        });
    } else {
        ad_service.get_ads(pageNum, pageSize, searchText).then(result => {
            res.json(result);
        });
    }
});

// 更新广告
router.put("/", function (req, res) {
    let id = req.body.id;
    delete req.body.id;
    if (!(id && Object.keys(req.body).length)) {
        res.json({
            status: -100,
            msg: "请求参数错误"
        });
    } else {
        ad_service.update_ad(id, req.body).then(result => {
            res.json(result);
        });
    }
});

// 插入新广告
router.post("/", function (req, res) {
    let catgId = req.body.catgId;
    let agentId = req.body.agentId;
    let lambdaFile = req.body.lambdaFileAddr;
    let mainBrand = req.body.mainBrand;
    let manufacturer = req.body.manufacturer;
    let proDescription = req.body.description;
    let verDescription = req.body.verDescription;
    let lang = req.body.lang;
    let tags = req.body.tags;
    if (!(catgId && lambdaFile && mainBrand && manufacturer && proDescription && verDescription && lang && tags)) {
        res.json({
            status: -100,
            msg: "请求参数错误"
        });
    } else {
        if (!agentId) {
            agentId = 0;
        }
        ad_service.create_ad(catgId, agentId, lambdaFile, mainBrand, manufacturer,
            proDescription, verDescription, lang, tags).then(result => {
            res.json(result);
        });
    }
 
});

// 删除广告
router.delete("/", function (req, res) {
    let id = req.body.id;
    if (id) {
        ad_service.delete_ad(id).then(result => {
            res.json(result);
        })
    } else {
        res.json({
            status: -100,
            msg: "请求参数错误"
        });
    }
});

module.exports = router;