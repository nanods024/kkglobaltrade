const express = require('express');
const { body } = require('express-validator');
const { submitContact } = require('../controllers/contactController');
const { validate } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validate,
  submitContact
);

module.exports = router;
