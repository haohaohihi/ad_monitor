const express = require('express');
const router = express.Router();

const tag_service = require("../../service/tag_service");

router.get("/", (req, res) => {
    tag_service.get_all_tags().then(result => {
        res.json(result);
    })
});

module.exports = router;