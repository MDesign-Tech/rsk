const { body } = require("express-validator");

const validateMissionVision = [
  body("missionTitle")
    .trim()
    .notEmpty()
    .withMessage("Mission title is required"),

  body("missionDescription")
    .trim()
    .notEmpty()
    .withMessage("Mission description is required"),

  body("visionTitle")
    .trim()
    .notEmpty()
    .withMessage("Vision title is required"),

  body("visionDescription")
    .trim()
    .notEmpty()
    .withMessage("Vision description is required"),
];

module.exports = {
  validateMissionVision,
};