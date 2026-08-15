const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublish,
  uploadImages,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

const productValidators = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('category')
    .isIn(['Spices', 'Pulses', 'Millets & Grains', 'Superfoods', 'Natural Ingredients'])
    .withMessage('Invalid category'),
];

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.post('/upload', protect, adminOnly, upload.array('images', 8), uploadImages);
router.get('/:slug', getProductBySlug);

router.post('/', protect, adminOnly, productValidators, validate, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.patch('/:id/publish', protect, adminOnly, togglePublish);

module.exports = router;
