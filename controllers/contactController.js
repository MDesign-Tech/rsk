const ContactMessage = require('../models/ContactMessage');
const AboutUs = require('../models/AboutUs');
const { sendReplyEmail } = require('../src/utils/emailService');

const getCompanyInfo = async () => {
  try {
    const about = await AboutUs.findOne();
    if (!about || !about.contactMethods || about.contactMethods.length === 0) {
      return {};
    }

    const emailContact = about.contactMethods.find((c) => c.label === 'Email');
    const phoneContact = about.contactMethods.find((c) => c.label === 'Phone');
    const locationContact = about.contactMethods.find((c) => c.label === 'Location');

    return {
      companyName: about.title || 'RSK Associates',
      companyAddress: locationContact ? locationContact.value : 'KIMIRONKO, KG 11 Ave, Kigali',
      companyPhone: phoneContact ? phoneContact.value : '+250 788 492 529',
    };
  } catch (error) {
    return {};
  }
};

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

const replyToMessage = async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
      errors: ['No message found with this ID'],
    });
  }

  const { reply } = req.body;

  if (!reply || !reply.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Reply is required',
      errors: ['Please provide a reply message'],
    });
  }

  message.reply = reply.trim();
  message.replyAt = new Date();
  message.repliedBy = req.user ? req.user._id : null;
  message.status = 'replied';

  await message.save();

  const companyInfo = await getCompanyInfo();

  try {
    await sendReplyEmail(message.email, 'Re: Your Message to RSK Associates', reply, companyInfo);
  } catch (error) {
    console.error('Error sending reply email:', error);
  }

  return res.status(200).json({
    success: true,
    message: 'Reply sent successfully',
    data: { message },
  });
};

module.exports = {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  deleteContactMessage,
  replyToMessage,
};
