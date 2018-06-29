const express = require('express');
const router = express.Router();
const channel_service = require("../../service/channel_service");

router.get("/", (req, res) => {
    let pageNum = req.query.currentPageNum;
    let pageSize = req.query.pageSize;
    delete req.query.currentPageNum;
    delete req.query.pageSize;

    if (isNaN(pageNum) || isNaN(pageSize)) {
        res.json({
            status: -100,
            msg: "请求参数错误"
        });
    } else {
        channel_service.get_channels_by_names_areas(pageNum, pageSize, req.query).then(result => {
            console.log(result);
            res.json(result);
        });
    }
});

router.post("/", (req, res) => {
    console.log(req.body);
    channel_service.create_channel(req.body).then(result => {
        res.json(result);
    });
});

router.put("/", (req, res) => {
    let id = req.body.id;
    delete req.body.id;
    if (!(id && Object.keys(req.body).length)) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    } else {
        channel_service.update_channel(id, req.body).then(result => {
            res.json(result);
        });
    }
});

router.delete("/", (req, res) => {
    let ids = req.body.ids;
    if (!ids || ids.length < 3) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    } else {
        ids = ids.substr(1, ids.length - 2).split(",");
        channel_service.delete_channels(ids).then(result => {
            res.json(result);
        });
    }
});

module.exports = router;