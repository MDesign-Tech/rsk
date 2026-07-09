const express = require('express');
const { body } = require('express-validator');
const {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  deleteContactMessage,
} = require('../controllers/contactController');
const { validateContact } = require('../validators/contactValidator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', validateContact, createContactMessage);

router.use(protect);

router.get('/', getContactMessages);
router.get('/:id', getContactMessage);
router.delete('/:id', deleteContactMessage);

module.exports = router;
