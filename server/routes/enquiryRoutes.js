const express = require('express');
const { body } = require('express-validator');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryStats,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');

const router = express.Router();

const rfqValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('country').notEmpty().withMessage('Country is required'),
];

router.post('/', rfqValidators, validate, createEnquiry);

router.get('/', protect, adminOnly, getEnquiries);
router.get('/stats', protect, adminOnly, getEnquiryStats);
router.get('/:id', protect, adminOnly, getEnquiryById);
router.put('/:id', protect, adminOnly, updateEnquiry);
router.delete('/:id', protect, adminOnly, deleteEnquiry);

module.exports = router;
