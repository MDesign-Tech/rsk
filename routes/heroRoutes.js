const express = require('express');
const { body } = require('express-validator');
const { getHero, updateHero, uploadHeroImage } = require('../controllers/heroController');
const { validateHero } = require('../validators/heroValidator');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router.get('/', getHero);
router.put('/', validateHero, updateHero);
router.post('/upload', upload.single('image'), uploadHeroImage);

module.exports = router;
