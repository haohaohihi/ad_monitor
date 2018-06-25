const express = require('express');
const router = express.Router();

const catg_service = require("../../service/catg_service");

router.get("/", (req, res) => {
    catg_service.get_all_catgs().then(result => {
        res.json(result);
    })
});

module.exports = router;