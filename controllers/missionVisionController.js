const MissionVision = require("../models/MissionVision");

const getMissionVision = async (req, res) => {
  let missionVision = await MissionVision.findOne();

  if (!missionVision) {
    missionVision = await MissionVision.create({
      missionTitle: "Our Mission",
      missionDescription:
        "To empower businesses with comprehensive financial expertise and strategic guidance, enabling them to make informed decisions, optimize their operations, and achieve sustainable growth. We are committed to delivering exceptional service with integrity, professionalism, and a deep understanding of our clients' unique challenges and opportunities.",

      visionTitle: "Our Vision",
      visionDescription:
        "To be the trusted partner of choice for businesses seeking financial excellence and strategic transformation. We envision a future where our clients thrive in a dynamic marketplace, supported by our innovative solutions, forward-thinking approach, and unwavering commitment to their success and growth.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Mission and Vision retrieved successfully",
    data: missionVision,
  });
};

const updateMissionVision = async (req, res) => {
  let missionVision = await MissionVision.findOne();

  if (!missionVision) {
    missionVision = await MissionVision.create(req.body);
  } else {
    missionVision.missionTitle = req.body.missionTitle;
    missionVision.missionDescription = req.body.missionDescription;
    missionVision.visionTitle = req.body.visionTitle;
    missionVision.visionDescription = req.body.visionDescription;

    await missionVision.save();
  }

  return res.status(200).json({
    success: true,
    message: "Mission and Vision updated successfully",
    data: missionVision,
  });
};

module.exports = {
  getMissionVision,
  updateMissionVision,
};
