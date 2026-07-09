const express = require('express');
const { body } = require('express-validator');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { validateAbout } = require('../validators/aboutValidator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getAbout);
router.put('/', validateAbout, updateAbout);

module.exports = router;
