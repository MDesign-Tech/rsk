const AboutUs = require("../models/AboutUs");

const DEFAULT_ABOUT = {
  title: "About RSK Associates",

  description:
    "At RSK Associates, we are more than accountants; we are trusted partners on the path to financial success.",

  stats: [
    {
      number: "500+",
      label: "Clients",
    },
    {
      number: "50+",
      label: "Experts",
    },
    {
      number: "15+",
      label: "Years Experience",
    },
  ],

  contactMethods: [
    {
      label: "Email",
      value: "rskassociatescpa@gmail.com",
      href: null,
    },

    {
      label: "Phone",
      value: "+250 788 492 529",
      href: null,
    },

    {
      label: "Location",
      value: "KIMIRONKO, KG 11 Ave, Kigali",
      href: "https://www.google.com/maps/dir//KG+11+Ave,+Kigali",
    },
  ],
};

const getAbout = async (req, res) => {
  let about = await AboutUs.findOne();

  if (!about) {
    about = await AboutUs.create(DEFAULT_ABOUT);
  }

  res.status(200).json({
    success: true,
    message: "About retrieved successfully",
    data: {
      about,
    },
  });
};

const updateAbout = async (req, res) => {
  let about = await AboutUs.findOne();

  if (!about) {
    about = await AboutUs.create(req.body);
  } else {
    Object.assign(about, req.body);

    await about.save();
  }

  res.status(200).json({
    success: true,
    message: "About updated successfully",
    data: {
      about,
    },
  });
};

module.exports = {
  getAbout,
  updateAbout,
};
