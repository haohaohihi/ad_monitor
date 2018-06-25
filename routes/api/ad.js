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
    }
    ad_service.get_ads(pageNum, pageSize, searchText).then(result => {
        res.json(result);
    });
});

// 更新广告
router.put("/", function (req, res) {
    let id = req.body.id;
    let fineClass = req.body.fineClass;
    let lambdaFileAddr = req.body.lambdaFileAddr;
    let mainBrand = req.body.mainBrand;
    let manufacturer = req.body.manufacturer;
    let description = req.body.description;
    let tags = req.body.tags;
    console.log(id + "\n" +
        fineClass + "\n" +
        lambdaFileAddr + "\n" +
        mainBrand + "\n" +
        manufacturer + "\n" +
        description + "\n" +
        tags + "\n");
    res.json({});
});

// 插入新广告
router.post("/", function (req, res) {

});

// 删除广告
router.delete("/", function (req, res) {

});

// 移除广告标签
router.delete("/tag", function (req, res) {

});

// 增加广告标签
router.post("/tag", function (req, res) {

});


module.exports = router;