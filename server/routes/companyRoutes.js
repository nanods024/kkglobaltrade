const express = require('express');
const { getCompanyProfile, updateCompanyProfile } = require('../controllers/companyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCompanyProfile);
router.put('/', protect, adminOnly, updateCompanyProfile);

module.exports = router;
