const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize.js');
const ChannelInfo = require("../models/ChannelInfo.js");
const AdCategoryInfo = require("../models/AdCategoryInfo.js");
const TagInfo = require("../models/TagInfo.js");
const AdInfo = require("../models/AdInfo.js");

ChannelInfo.create({
    "channelName": "中央1套",
    "adminLevel": "国家级",
    "area": "全国",
    "province": "全国",
    "city": "全国",
    "coverLevel": "全国",
    "coverArea": "全国",
    "coverProvince": "全国",
    "coverCity": "全国",
}).then(user => {
    console.log(user.dataValues);
}).catch(err => {
    console.log(err.message);
    ChannelInfo.findAll({
        where: {
            "channelName": "中央1套"
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
    "thirdCATG": "MPV汽车",
}).then(catg => {
    console.log(catg.dataValues)
}).catch(err => {
    console.log(err.message);
    AdCategoryInfo.findOne().then(catg => {
        console.log(catg.dataValues);
    });
});

TagInfo.create({
    "tagName": "风景"
}).then(tag => {
    console.log(tag.dataValues);
}).catch(err => {
    console.log(err.message);
    TagInfo.findOne().then(tag => {
        console.log(tag.dataValues);
    })
});

AdInfo.create({
    "catgId": 1,
    "lambdaFile": "root/etc/lamda/qwert111.xyz",
    "verDescription": "展示篇",
    "mainBrand": "海尔",
    "manufacturer": "海尔集团",
    "lang": "普通话",
    "proDescription": "海尔成套智慧家电",
    "tagIds": "1,",
}).then(ad => {
    console.log(ad.dataValues);
}).catch(err => {
    console.log(err.message);
    AdInfo.findOne().then(ad => {
        console.log(ad.dataValues);
    })
});
