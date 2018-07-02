const express = require('express');
const router = express.Router();
const channelAdCharge_service = require("../../service/channelAdCharge_service");

router.get("/", (req, res) => {
    let channelId = req.query.channelId;
    if (!channelId) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    } else {
        channelAdCharge_service.get_charges_by_channel(channelId).then(result => {
            res.json(result);
        });
    }
});

router.post("/", (req, res) => {
    let channelId = req.body.channelId;
    delete req.body.channelId;
    if (!channelId) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        })
    } else {
        channelAdCharge_service.create_charge(channelId, req.body).then(result => {
            res.json(result);
        });
    }
});

router.put("/", (req, res) => {
    let channelId = req.body.channelId;
    let scopeId = req.body.scopeId;
    delete req.body.channelId;
    delete req.body.scopeId;
    if (!(channelId && scopeId)) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        })
    } else {
        channelAdCharge_service.update_charge(channelId, scopeId, req.body).then(result => {
            res.json(result);
        });
    }
});

router.delete("/", (req, res) => {
    let channelId = req.body.channelId;
    let scopeIds = req.body.scopeIds;
    console.log(req.body);
    if (!scopeIds || scopeIds.length < 3 || !channelId) {
        res.json({
            "status": -100,
            "msg": "请求参数错误"
        });
    } else {
        scopeIds = scopeIds.substr(1, scopeIds.length - 2).split(",");
        channelAdCharge_service.delete_charges(channelId, scopeIds).then(result => {
            res.json(result);
        });
    }
});

module.exports = router;