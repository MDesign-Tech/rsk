const express = require('express');
const { getWebsiteContent } = require('../controllers/websiteController');
const router = express.Router();

router.get("/", getWebsiteContent);

module.exports = router;