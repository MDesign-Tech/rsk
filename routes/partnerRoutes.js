const express = require('express');
const { body } = require('express-validator');
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
} = require('../controllers/partnerController');
const { validatePartner } = require('../validators/partnerValidator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getPartners);
router.get('/:id', getPartner);
router.post('/', validatePartner, createPartner);
router.put('/:id', validatePartner, updatePartner);
router.delete('/:id', deletePartner);

module.exports = router;
