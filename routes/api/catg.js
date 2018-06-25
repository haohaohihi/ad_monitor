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
    let first_catg = req.query.first_catg;
    if (!first_catg) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    }
    return catg_service.get_second_catgs(first_catg).then(result => {
        res.json(result);
    });
});

router.get("/third", (req, res) => {
    let first_catg = req.query.first_catg;
    let second_catg = req.query.second_catg;
    if (!(first_catg && second_catg)) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    }
    return catg_service.get_third_catgs(first_catg, second_catg).then(result => {
        res.json(result);
    });
});

router.post("/", (req, res) => {
    let first_catg = req.body.first_catg;
    let second_catg = req.body.second_catg;
    let third_catg = req.body.third_catg;

    if (first_catg && !second_catg) {
        console.log("add first catg");
        catg_service.add_first_catg(first_catg).then(result => {
            res.json(result);
        });
    } else if (first_catg && second_catg) {
        if (!third_catg) {
            console.log("add second catg");
            catg_service.add_second_catg(first_catg, second_catg).then(result => {
                res.json(result);
            });
        } else {
            console.log("add third catg");
            catg_service.add_third_catg(first_catg, second_catg, third_catg).then(result => {
                res.json(result);
            });
        }
    } else {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    }
});

module.exports = router;