const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');
const ChannelInfo = require("../models/ChannelInfo.js");
const AdCategoryInfo = require("../models/AdCategoryInfo.js");
const AdInfo = require("../models/AdInfo.js");
const ChannelAdCharge = require("../models/ChannelAdCharge.js");

ChannelInfo.create({
    "name": "中央1套",
    "area": "全国",
    "province": "全国",
    "city": "全国",
    "coverArea": "全国",
    "coverProvince": "全国",
    "coverCity": "全国",
}).then(user => {
    console.log(user.dataValues);
}).catch(err => {
    console.log(err.message);
    ChannelInfo.findAll({
        where: {
            "name": "中央1套"
        }
    }).then(channels => {
        channels.forEach(channel => {
            console.log(channel.dataValues);
        })
    })
});

AdCategoryInfo.create({
    "firstCATG": "交通",
    "secondCATG": "交通工具",
    "thirdCATG": "null",
}).then(catg => {
    console.log(catg.dataValues)
}).catch(err => {
    console.log(err.message);
    AdCategoryInfo.findOne().then(catg => {
        console.log(catg.dataValues);
    });
});

AdInfo.create({
    "catgId": 1,
    "agentId": 0,
    "lambdaFile": "root/etc/lamda/qwert111.xyz",
    "verDescription": "展示篇",
    "mainBrand": "海尔",
    "manufacturer": "海尔集团",
    "lang": "普通话",
    "proDescription": "海尔成套智慧家电",
    "tags": "1",
}).then(ad => {
    console.log(ad.dataValues);
}).catch(err => {
    console.log(err.message);
    AdInfo.findOne().then(ad => {
        console.log(ad.dataValues);
    })
});

ChannelAdCharge.create({
    "channelId": 4,
    "scopeId": 1,
    "weekDay": 1,
    "proBefore": "节目1",
    "proAfter": "节目2",
    "startTime": "12:05:20",
    "endTime": "12:10:22",
    "sOneCharge": 1000,
    "sTwoCharege": 2000,
    "sThreeCharge": 3000
}).then(charge => {
    console.log(charge.dataValues);
}).catch(err => {
    console.log(err.message);
    ChannelInfo.findOne().then(charge => {
        console.log(charge.dataValues);
    });
});