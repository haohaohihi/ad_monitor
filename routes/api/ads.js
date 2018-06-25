const express = require('express');
const router = express.Router();
const ad_service = require("../../service/ad_service.js");
/* GET home page. */
router.get('/ads', function (req, res) {
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

module.exports = router;