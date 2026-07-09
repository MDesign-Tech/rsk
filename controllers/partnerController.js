const Partner = require('../models/Partner');

const DEFAULT_PARTNERS = [
  {
    name: "Bank of Kigali",
    text: "BK",
  },
  {
    name: "MTN Rwanda",
    text: "MTN",
  },
  {
    name: "Umujyi wa Kigali",
    text: "UMUGI WA KIGALI",
  },
  {
    name: "Airtel Rwanda",
    text: "Airtel",
  },
  {
    name: "Sensitive",
    text: "Sensitive",
  },
];


const getPartners = async (req, res) => {
  let partners = await Partner.find();

  // Create default partners if database is empty
  if (!partners.length) {
    partners = await Partner.insertMany(DEFAULT_PARTNERS);
  }

  return res.status(200).json({
    success: true,
    message: 'Partners retrieved successfully',
    data: { partners },
  });
};


const getPartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: 'Partner not found',
      errors: ['No partner found with this ID'],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Partner retrieved successfully',
    data: { partner },
  });
};


const createPartner = async (req, res) => {
  const partner = await Partner.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Partner created successfully',
    data: { partner },
  });
};


const updatePartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: 'Partner not found',
      errors: ['No partner found with this ID'],
    });
  }

  Object.assign(partner, req.body);
  await partner.save();

  return res.status(200).json({
    success: true,
    message: 'Partner updated successfully',
    data: { partner },
  });
};


const deletePartner = async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      message: 'Partner not found',
      errors: ['No partner found with this ID'],
    });
  }

  await partner.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Partner deleted successfully',
    data: {},
  });
};


module.exports = {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
};