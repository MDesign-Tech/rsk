const ContactMessage = require('../models/ContactMessage');

const createContactMessage = async (req, res) => {
  const message = await ContactMessage.create(req.body);
  return res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: { message },
  });
};

const getContactMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    message: 'Contact messages retrieved successfully',
    data: { messages },
  });
};

const getContactMessage = async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
      errors: ['No message found with this ID'],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Message retrieved successfully',
    data: { message },
  });
};

const deleteContactMessage = async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
      errors: ['No message found with this ID'],
    });
  }

  await message.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
    data: {},
  });
};

module.exports = {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  deleteContactMessage,
};
