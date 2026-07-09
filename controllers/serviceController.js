const Service = require('../models/Service');

const DEFAULT_SERVICES = [
  {
    title: "Audit",
    description:
      "Comprehensive audit services ensuring financial accuracy, transparency, and regulatory compliance for your organization.",
  },
  {
    title: "Tax Advisory",
    description:
      "Strategic tax planning and optimization to minimize your tax burden while maximizing financial efficiency.",
  },
  {
    title: "Financial Consulting",
    description:
      "Expert financial guidance to improve profitability, cash flow management, and long-term financial planning.",
  },
  {
    title: "Business Management",
    description:
      "Comprehensive business management solutions to streamline operations and drive sustainable growth.",
  },
  {
    title: "Compliance & Financial Product Development",
    description:
      "Develop compliant financial products and ensure regulatory adherence across all business operations.",
  },
  {
    title: "Supporting Business Growth",
    description:
      "Strategic initiatives and support to accelerate your business growth and achieve your objectives.",
  },
];


const getServices = async (req, res) => {
  let services = await Service.find();

  // If database is empty, create default services
  if (!services.length) {
    services = await Service.insertMany(DEFAULT_SERVICES);
  }

  return res.status(200).json({
    success: true,
    message: 'Services retrieved successfully',
    data: { services },
  });
};


const getService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found',
      errors: ['No service found with this ID'],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Service retrieved successfully',
    data: { service },
  });
};


const createService = async (req, res) => {
  const service = await Service.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: { service },
  });
};


const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found',
      errors: ['No service found with this ID'],
    });
  }

  Object.assign(service, req.body);
  await service.save();

  return res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: { service },
  });
};


const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found',
      errors: ['No service found with this ID'],
    });
  }

  await service.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
    data: {},
  });
};


module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};