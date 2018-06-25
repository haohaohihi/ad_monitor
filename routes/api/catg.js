const express = require('express');
const router = express.Router();

const catg_service = require("../../service/catg_service");

router.get("/", (req, res) => {
    catg_service.get_all_catgs().then(result => {
        res.json(result);
    });
});

router.get("/first", (req, res) => {
    catg_service.get_first_catgs().then(result => {
        res.json(result);
    });
});

router.get("/second", (req, res) => {
    let first_tag = req.query.first_tag;
    if (!first_tag) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    }
    return catg_service.get_second_catgs(first_tag).then(result => {
        res.json(result);
    });
});

router.get("/third", (req, res) => {
    let first_tag = req.query.first_tag;
    let second_tag = req.query.second_tag;
    if (!(first_tag && second_tag)) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    }
    return catg_service.get_third_catgs(first_tag, second_tag).then(result => {
        res.json(result);
    });
});

module.exports = router;