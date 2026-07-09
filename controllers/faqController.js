const FAQ = require('../models/FAQ');

const DEFAULT_FAQS = [
  {
    question: "What services does RSK Associates provide?",
    answer:
      "We provide auditing, tax advisory, financial consulting, business management consulting, compliance services, and financial product development tailored to businesses and individuals.",
  },
  {
    question: "Who can benefit from RSK Associates' services?",
    answer:
      "Our services are designed for startups, SMEs, large corporations, NGOs, government institutions, and individual clients seeking expert financial and business advisory services.",
  },
  {
    question: "How can RSK Associates help my business stay compliant?",
    answer:
      "We assess your business operations, review policies, identify compliance gaps, and help ensure you meet applicable regulatory and financial reporting requirements.",
  },
  {
    question: "Why should I hire an external auditor?",
    answer:
      "An independent audit improves the credibility of your financial statements, identifies operational risks, strengthens internal controls, and helps build trust with investors, lenders, and regulators.",
  },
  {
    question: "Do you provide tax planning and advisory services?",
    answer:
      "Yes. We assist businesses and individuals with tax planning, tax compliance, filing support, and strategies to optimize tax obligations while complying with Rwandan tax laws.",
  },
];

const getFAQs = async (req, res) => {
  let faqs = await FAQ.find();

  if (faqs.length === 0) {
    await FAQ.insertMany(DEFAULT_FAQS);
    faqs = await FAQ.find();
  }

  return res.status(200).json({
    success: true,
    message: "FAQs retrieved successfully",
    data: { faqs },
  });
};

const getFAQ = async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ not found',
      errors: ['No FAQ found with this ID'],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'FAQ retrieved successfully',
    data: { faq },
  });
};

const createFAQ = async (req, res) => {
  const faq = await FAQ.create(req.body);
  return res.status(201).json({
    success: true,
    message: 'FAQ created successfully',
    data: { faq },
  });
};

const updateFAQ = async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ not found',
      errors: ['No FAQ found with this ID'],
    });
  }

  Object.assign(faq, req.body);
  await faq.save();

  return res.status(200).json({
    success: true,
    message: 'FAQ updated successfully',
    data: { faq },
  });
};

const deleteFAQ = async (req, res) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ not found',
      errors: ['No FAQ found with this ID'],
    });
  }

  await faq.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'FAQ deleted successfully',
    data: {},
  });
};

module.exports = {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
