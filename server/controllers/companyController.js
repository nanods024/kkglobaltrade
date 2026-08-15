const asyncHandler = require('express-async-handler');
const CompanyProfile = require('../models/CompanyProfile');

// The site only ever needs one CompanyProfile document; this helper
// creates it on first request instead of requiring a manual seed step.
async function getOrCreateProfile() {
  let profile = await CompanyProfile.findOne();
  if (!profile) {
    profile = await CompanyProfile.create({});
  }
  return profile;
}

// @route GET /api/company
const getCompanyProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  res.json({ success: true, data: profile });
});

// @route PUT /api/company (admin)
const updateCompanyProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  Object.assign(profile, req.body);
  await profile.save();
  res.json({ success: true, data: profile });
});

module.exports = { getCompanyProfile, updateCompanyProfile };
